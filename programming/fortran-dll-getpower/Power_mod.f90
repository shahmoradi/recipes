module Power_mod
    implicit none
contains
    function getPower(base,expo) result(power) bind(C, name="getPow")
        !DEC$ ATTRIBUTES DLLEXPORT :: getPower
        use, intrinsic :: iso_c_binding, only: RK => c_double, IK => c_int32_t
        real(RK)    , intent(in)    :: base
        integer(IK) , intent(in)    :: expo
        real(RK)                    :: power
        power = base ** expo
    end function getPower
end module Power_mod
