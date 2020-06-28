program mainCallString

    use, intrinsic :: iso_fortran_env, only: output_unit
    use String_mod, only: replaceStr
    implicit none
    character(:), allocatable :: sentence, sentenceModified

    sentence = "FORTRAN is a highly flexible expressive natively-parallel programming language for numerical computing."
    sentenceModified = replaceStr(string = sentence, search = "FORTRAN", substitute = "Fortran, not FORTRAN,") 

    write(output_unit,"(A)") sentenceModified

end program mainCallString