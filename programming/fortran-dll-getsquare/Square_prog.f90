program Square_prog
    use, intrinsic :: iso_fortran_env, only: RK => real64
    use Square_mod, only: getSquare
    implicit none
    real(RK) :: val = 100._RK
    write(*,"(*(g0.13,:,' '))") "Square of", val, "is", getSquare(val)
end program Square_prog
