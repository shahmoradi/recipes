module String_mod

    implicit none

contains

    subroutine getLowerCase(StrVec,StrVecLowerCase,lenStrVec) bind(C, name="getLowerCase")
        use, intrinsic :: iso_c_binding, only: c_char, c_null_char, c_size_t
        use, intrinsic :: iso_fortran_env, only: IK => int32
        integer(c_size_t), intent(in), value        :: lenStrVec
        character(len=1,kind=C_char), intent(in)    :: StrVec(lenStrVec)
        character(len=1,kind=C_char), intent(inout) :: StrVecLowerCase(lenStrVec)
        integer(IK), parameter                      :: duc = ichar('A') - ichar('a')
        character                                   :: ch
        integer(IK)                                 :: i
        write(*,"(*(g0))") "From Inside Fortran@getLowerCase(): StrVec = ", (StrVec(i),i=1,lenStrVec)
        write(*,"(*(g0))") "From Inside Fortran@getLowerCase(): lenStrVec = ", lenStrVec
        do i = 1, lenStrVec
            ch = StrVec(i)
            if (ch>='A' .and. ch<='Z') ch = char(ichar(ch)-duc)
            StrVecLowerCase(i) = ch
        end do
    end subroutine getLowerCase

    function printString(string) result(success) bind(C, name="printString")
        character(len=*), intent(in)    :: string
        character(len=1)                :: success
        write(*,"(*(g0))") "From Inside Fortran@printString(): string = ", string
        success = "T"
    end function printString

	subroutine ToLower( StrIn, Siz, StrOut, Irc ) bind(C, name="ToLower")
        use, intrinsic :: iso_c_binding, only : c_int, c_char, c_size_t, c_null_char, c_f_pointer, c_loc
        ! Argument list
        character(kind=c_char,len=1), intent(in), target :: StrIn(*)
        integer(kind=c_size_t), intent(in), value :: Siz
        character(kind=c_char, len=1), allocatable, intent(out), target :: StrOut(:)
        integer(kind=c_int), intent(inout) :: Irc
        Irc = 0
        ! Error checking elided e.g., what if Siz is < 0
        ! Allocate the out string; size is plus 1 for NUL termination
        allocate( StrOut(Siz+1), stat=Irc )
        if ( Irc /= 0 ) return
        blk: block
            character(kind=c_char,len=Siz), pointer :: F_STR_IN => null()
            character(kind=c_char,len=size(StrOut)), pointer :: F_STR_OUT => null()
            character(kind=c_char,len=1) :: ch
            integer, parameter :: duc = ichar('A') - ichar('a')
            integer(c_size_t) :: i
            call c_f_pointer( cptr=c_loc(StrIn), fptr=F_STR_IN )
            call c_f_pointer( cptr=c_loc(StrOut), fptr=F_STR_OUT )
            print *, "Inside Fortran subroutine ToLower"
            print *, "StrVec = ", F_STR_IN
            F_STR_OUT = F_STR_IN // c_null_char
            do i = 1, size(StrOut) - 1
                ch = F_STR_IN(i:i)
                if (ch>='A' .and. ch<='Z') ch = char(ichar(ch)-duc)
                F_STR_OUT(i:i) = ch
            end do
            F_STR_IN => null()
            F_STR_OUT => null()
        end block blk
	end subroutine ToLower

end module String_mod