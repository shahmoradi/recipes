module String_mod
    use, intrinsic :: iso_fortran_env, only: IK => int32
    implicit none
contains
    function getLowerCase(StrVec) result(StrVecLowerCase) bind(C, name="getLowerCase")
        use, intrinsic :: iso_c_binding, only: c_char, c_null_char, c_ptr, c_size_t
        character(kind=c_char), intent(in)          :: StrVec(*)
        integer(IK), parameter                      :: duc = ichar('A') - ichar('a')
        type(c_ptr)                                 :: StrVecLowerCase
        character                                   :: ch
        integer(kind=c_size_t)                      :: lenStrVec
        integer(IK)                                 :: i
        lenStrVec = len(StrVec)
        write(*,"(*(g0))") "From Inside Fortran@getLowerCase(): StrVec = ", (StrVec(i),i=1,lenStrVec)
        do i = 1, lenStrVec - 1
            ch = StrVec(i)
            if (ch>='A' .and. ch<='Z') ch = char(ichar(ch)-duc)
            !StrVecLowerCase(i:i) = ch
        end do
        StrVecLowerCase = 2
        !StrVecLowerCase(lenStrVec:lenStrVec) = c_null_char
    end function getLowerCase
end module String_mod