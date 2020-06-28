program mainCallMath

    use, intrinsic :: iso_fortran_env, only: output_unit, IK => int32, RK => real64
    use Math_mod, only: getDistanceSq
    implicit none
    integer(IK) :: ndim, i
    real(RK), allocatable :: point1(:), point2(:)
    character(:), allocatable :: sentence, sentenceModified
    real(RK) :: distanceSq

    ndim = 3_IK
    point1 = [ (0_IK, i = 1, ndim)]
    point2 = [ (i, i = 1, ndim)]

    ! call Math module from the DLL string

    distanceSq = getDistanceSq  ( nd = ndim &
                                , point1 = point1 &
                                , point2 = point2 &
                                )

end program mainCallMath