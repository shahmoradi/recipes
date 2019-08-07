program Power_prog
    use, intrinsic :: iso_c_binding, only: RK => c_double, IK => c_int32_t
    use Power_mod, only: getPower
    implicit none
    real(RK)    :: base = 100._RK
    integer(IK) :: expo = 3_IK
    interface
    function getPow(base,expo) result(power)
        !DEC$ ATTRIBUTES DLLIMPORT, DECORATE, ALIAS: 'getPow' :: getPow
        use, intrinsic :: iso_c_binding, only: RK => c_double, IK => c_int32_t
        real(RK)    , intent(in)    :: base
        integer(IK) , intent(in)    :: expo
        real(RK)                    :: power
    end function getPow
    end interface
    write(*,"(*(g0.13,:,' '))") "getPower(", base, ",", expo, ") =", getPower(base,expo)
    write(*,"(*(g0.13,:,' '))") "  getPow(", base, ",", expo, ") =",   getPow(base,expo)
end program Power_prog