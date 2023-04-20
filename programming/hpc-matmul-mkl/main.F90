program matmul_benchmark

    use iso_fortran_env, only: error_unit, int64
    implicit none

    integer(int64) :: tic, toc
    real, allocatable :: matA(:,:), matB(:,:), matC(:,:)
    real :: rate, naiveTime, matmulTime, blasTime, dummy = 0.
    integer, parameter :: nrepeat = 2**17
    integer :: i, rank, irepeat

    write(*, "(*(g0,:,', '))") "matrixRank", "seconds_naive", "seconds_matmul", "seconds_blas"

    ! Loop over array sizes.
    do i = 1, 9

        rank = 2**i ! matrix rank.
        allocate(matA(rank, rank), matB(rank, rank), matC(rank, rank)) ! allocate memory for the matrices.

        ! Benchmark the naive matrix multiplication implementation.

        call reset(matA, matB, matC)
        call system_clock(tic, rate)
        do irepeat = 1, nrepeat / rank
            call setMatMul(matA, matB, matC)
        end do
        call system_clock(toc)
        naiveTime = (toc - tic) / rate / nrepeat
        dummy = dummy + sum(matC) + naiveTime ! dummy operation to prevent aggressive compiler optimizations each benchmark.

        ! Benchmark the intrinsic `matmul` matrix multiplication implementation.

        call reset(matA, matB, matC)
        call system_clock(tic, rate)
        do irepeat = 1, nrepeat / rank
            matC = matC + matmul(matA, matB)
        end do
        call system_clock(toc)
        matmulTime = (toc - tic) / rate / nrepeat
        dummy = dummy + sum(matC) + matmulTime ! dummy operation to prevent aggressive compiler optimizations each benchmark.

        ! Benchmark the intrinsic `matmul` matrix multiplication implementation.

        call reset(matA, matB, matC)
        call system_clock(tic, rate)
        do irepeat = 1, nrepeat / rank
            call sgemm  ( "N"           & ! transposition of matA.
                        , "N"           & ! transposition of matB.
                        , size(matA, 1) & ! the number of rows of `matA`.
                        , size(matB, 2) & ! the number of columns of `matB`.
                        , size(matA, 2) & ! the number of columns of `matA`.
                        , 1.            & ! the `alpha` coefficient of multiplication: C := alpha*op( A )*op( B ) + beta*C
                        , matA          & ! matrix matA.
                        , rank          & ! the leading dimension of matA.
                        , matB          & ! matrix matB.
                        , rank          & ! the leading dimension of matB.
                        , 1.            & ! the `beta` coefficient of multiplication: C := alpha*op( A )*op( B ) + beta*C
                        , matC          & ! matrix matC.
                        , rank          & ! the leading dimension of matC.
                        )
        end do
        call system_clock(toc)
        blasTime = (toc - tic) / rate / nrepeat
        dummy = dummy + sum(matC) + blasTime ! dummy operation to prevent aggressive compiler optimizations each benchmark.

        ! Report the timings.

        write(*, "(*(g0,:,', '))") rank, naiveTime, matmulTime, blasTime

        deallocate(matA, matB, matC)

    end do

    write(*, "(*(g0,:,', '))") dummy ! dummy operation to prevent aggressive compiler optimizations each benchmark.

contains

    subroutine reset(matA, matB, matC)
        ! Reset and fill the matrices with random values in range [-.5, .5].
        real, intent(out) :: matA(:,:), matB(:,:), matC(:,:)
        call random_number(matA); matA = matA - 0.5
        call random_number(matB); matB = matB - 0.5
        call random_number(matC); matC = matC - 0.5
    end

    pure subroutine setMatMul(matA, matB, matC)
        ! Update the input `matC` with the result of the matrix multiplication of `matA` with `matB`.
        real        , intent(in)    , contiguous    :: matA(:,:), matB(:,:)
        real        , intent(inout) , contiguous    :: matC(:,:)
        integer                                     :: i, j, k
        do concurrent(i = 1 : size(matA, 1), j = 1 : size(matB, 2))
            do k = 1, size(matA, 2)
                matC(i,j) = matC(i,j) + matA(i,k) * matB(k,j)
            end do
        end do
    end

end