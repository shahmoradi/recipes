module String_mod
    implicit none
contains
    subroutine replaceStrC  ( StrVec            &
                            , lenStrVec         &
                            , SearchVec         &
                            , lenSearchVec      &
                            , SubstituteVec     &
                            , lenSubstituteVec  &
                            , StrOut            &
                            , ierr              &
                            ) bind(C, name="replaceStr")

        use, intrinsic :: iso_c_binding, only : c_int, c_char, c_size_t, c_null_char, c_f_pointer, c_loc
        use, intrinsic :: iso_fortran_env, only: IK => int32

        character(kind=c_char,len=1), intent(in)                        :: StrVec(*), SearchVec(*), SubstituteVec(*)
        integer(kind=c_size_t), intent(in), value                       :: lenStrVec, lenSearchVec, lenSubstituteVec
        character(kind=c_char, len=1), allocatable, intent(out)         :: StrOut(:)
        integer(kind=c_int), intent(inout)                              :: ierr

        character(len=lenStrVec)                                        :: string
        character(len=lenSearchVec)                                     :: search
        character(len=lenSubstituteVec)                                 :: substitute
        character(:), allocatable                                       :: modifiedString
        integer(IK)                                                     :: i, lenModifiedString

        ! Construct the Fortran strings first.
        ! Note that rigorous error handling is ignored here.
        do i = 1, int(lenStrVec, kind=IK)
            string(i:i) = StrVec(i)
        end do
        do i = 1, int(lenSearchVec, kind=IK)
            search(i:i) = SearchVec(i)
        end do
        do i = 1, int(lenSubstituteVec, kind=IK)
            substitute(i:i) = SubstituteVec(i)
        end do

        ! Now call the Fortran function replaceStr(). 
        modifiedString = replaceStr(string,search,substitute)
        lenModifiedString = len(modifiedString)
        write (*, "(*(g0,:,''))" ) "@Fortran@replaceStrC(): string received from C = ", string
        write (*, "(*(g0,:,''))" ) "@Fortran@replaceStrC(): modified string by replaceStr() = ", modifiedString
        allocate( StrOut(lenModifiedString+1), stat=ierr )
        if ( ierr /= 0 ) return
        do i = 1, lenModifiedString
            StrOut(i) = modifiedString(i:i)
        end do
        StrOut(lenModifiedString+1) = c_null_char
        write (*, "(*(g0,:,''))" ) "@Fortran@replaceStrC(): modified allocatable string passed to C = ", StrOut

    end subroutine replaceStrC

    recursive function replaceStr(string,search,substitute) result(modifiedString)
        use, intrinsic :: iso_fortran_env, only: IK => int32
        implicit none
        character(len=*), intent(in)  :: string, search, substitute
        character(len=:), allocatable :: modifiedString
        integer(IK)                   :: i, stringLen, searchLen
        stringLen = len(string)
        searchLen = len(search)
        if (stringLen==0 .or. searchLen==0) then
            modifiedString = ""
            return
        elseif (stringLen<searchLen) then
            modifiedString = string
            return
        end if
        i = 1
        do
            if (string(i:i+searchLen-1)==search) then
                modifiedString = string(1:i-1) // substitute // replaceStr(string(i+searchLen:stringLen),search,substitute)
                exit
            end if
            if (i+searchLen>stringLen) then
                modifiedString = string
                exit
            end if
            i = i + 1
            cycle
        end do
    end function replaceStr

end module String_mod