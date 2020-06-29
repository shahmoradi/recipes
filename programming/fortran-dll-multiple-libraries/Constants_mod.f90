!***********************************************************************************************************************************
!***********************************************************************************************************************************
!
!   ParaMonte: plain powerful parallel Monte Carlo library.
!
!   Copyright (C) 2012-present, The Computational Data Science Lab
!
!   This file is part of the ParaMonte library.
!
!   ParaMonte is free software: you can redistribute it and/or modify it
!   under the terms of the GNU Lesser General Public License as published
!   by the Free Software Foundation, version 3 of the License.
!
!   ParaMonte is distributed in the hope that it will be useful,
!   but WITHOUT ANY WARRANTY; without even the implied warranty of
!   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
!   GNU Lesser General Public License for more details.
!
!   You should have received a copy of the GNU Lesser General Public License
!   along with the ParaMonte library. If not, see,
!
!       https://github.com/cdslaborg/paramonte/blob/master/LICENSE
!
!   ACKNOWLEDGMENT
!
!   As per the ParaMonte library license agreement terms,
!   if you use any parts of this library for any purposes,
!   we ask you to acknowledge the use of the ParaMonte library
!   in your work (education/research/industry/development/...)
!   by citing the ParaMonte library as described on this page:
!
!       https://github.com/cdslaborg/paramonte/blob/master/ACKNOWLEDGMENT.md
!
!***********************************************************************************************************************************
!***********************************************************************************************************************************

module Constants_mod

    use, intrinsic :: iso_fortran_env, only: real32, real64, int32, int64
    use, intrinsic ::   iso_c_binding, only: CIK => c_int32_t, CRK => c_double
#if defined CFI_ENABLED
    use, intrinsic ::   iso_c_binding, only: IK => c_int32_t, RK => c_double
#else
    use, intrinsic :: iso_fortran_env, only: IK => int32, RK => real64
#endif

    implicit none

    ! Constants for computational accuracy

    integer     , parameter :: SPR = real32                                             ! single precision real kind
    integer     , parameter :: DPR = real64                                             ! double precision real kind
    integer     , parameter :: SPI = int32                                              ! single precision integer kind
    integer     , parameter :: DPI = int64                                              ! double precision integer kind
    integer     , parameter :: SPC = kind((1._SPR,1._SPR))                              ! single-precision complex kind
    integer     , parameter :: DPC = kind((1._DPR,1._DPR))                              ! double-precision complex kind
    integer     , parameter :: CK = kind((1._RK,1._RK))                                 ! complex kind
    integer     , parameter :: RKP = precision(1._RK)                                   ! real kind precision
    integer(IK) , parameter :: MAX_REC_LEN = 9999                                       ! maximum string record length

    ! Mathematical constants

    real(RK)    , parameter :: PI = 3.141592653589793238462643383279502884197_DPR       ! = acos(-1._RK) : The irrational number Pi.
    real(RK)    , PARAMETER :: TWOPI = 6.283185307179586476925286766559005768394_DPR    ! 2*PI
    real(RK)    , parameter :: LN2 = log(2._RK)                                         ! Natural Log of 2 (= 0.693147180559945_RK).
    real(RK)    , parameter :: INVLN2 = 1._RK / LN2                                     ! Inverse of the natural Log of 2 (= 0.693147180559945_RK).
    real(RK)    , parameter :: LN10 = log(1.e1_RK)                                      ! Natural Log of 10 (= 2.302585092994046_RK).
    real(RK)    , parameter :: LN2PI = log(2._RK*PI)                                    ! ln(2pi) (= 1.837877066409345_RK)
    real(RK)    , parameter :: SQRT2 = sqrt(2._RK)                                      ! Square root of 2.
    real(RK)    , parameter :: NAPIER = exp(1._RK)                                      ! Napier number e.
    real(RK)    , parameter :: SQRTPI = sqrt(PI)                                        ! Square root of Pi.
    real(RK)    , parameter :: SQRT2PI = sqrt(2._RK*acos(-1._RK))                       ! Square root of 2Pi.
    real(RK)    , parameter :: HALFLN2PI = 0.5_RK*LN2PI                                 ! ln(sqrt(2pi))
    real(RK)    , parameter :: INVSQRT2PI = 1._RK / SQRT2PI                             ! 1/sqrt(2*Pi) (= 0.398942280401432_RK)
    real(RK)    , parameter :: LOGINVSQRT2PI = log(INVSQRT2PI)                          ! Log(1/sqrt(2Pi)), used in Gaussian distribution.
    real(RK)    , parameter :: SQRT_HALF_PI = sqrt(0.5_RK*PI)                           ! Square root of PI/2 (= 1.2533141373155_RK)
    real(RK)    , parameter :: LOG10NAPIER = log10(NAPIER)                              ! Log10 of Napier constant (= 0.434294481903259_RK).
    real(RK)    , parameter :: EPS_RK = epsilon(1._RK)                                  ! the smallest representable real increment (highest precision) by the machine
    real(RK)    , parameter :: HUGE_IK = huge(1_IK)                                     ! largest number of kind RK
    real(RK)    , parameter :: HUGE_RK = huge(1._RK)                                    ! largest number of kind RK
    real(RK)    , parameter :: TINY_RK = tiny(1._RK)                                    ! tiniest number of kind RK
    real(RK)    , parameter :: LOGHUGE_RK = log(HUGE_RK)                                ! log of the largest number of kind RK
    real(RK)    , parameter :: LOGTINY_RK = log(TINY_RK)                                ! log of the largest number of kind RK
    real(RK)    , parameter :: POSINF_RK =  HUGE_RK / 1.e1_RK                           ! the division is done to avoid overflow in output
    real(RK)    , parameter :: POSINF_IK =  HUGE_IK / 2_IK                              ! the division is done to avoid overflow in output
    real(RK)    , parameter :: NEGINF_RK = -POSINF_RK
    real(RK)    , parameter :: NEGINF_IK = -POSINF_IK
    real(RK)    , parameter :: NULL_RK = -HUGE_RK
    integer(IK) , parameter :: NULL_IK = -HUGE_IK
    character(1), parameter :: NULL_SK = achar(30)                                      ! This must remain a single character as it is assumed in multiple routines: Record separator
    character(1), parameter :: NLC = achar(10)                                          ! the New Line Character
    character(1), parameter :: TAB = achar(9)                                           ! the TAB Character
    character(*), parameter :: UNDEFINED = "UNDEFINED"

    ! null values

    type, private  :: NullType
        real(RK)     :: RK = NULL_RK
        integer(IK)  :: IK = NULL_IK
        character(1) :: SK = NULL_SK
    end type NullType
  
    type(NullType), protected :: NullVal

    character(len=1), parameter :: CARRIAGE_RETURN = achar(13)
    character(len=1), parameter :: ESCAPE = achar(27)
    character(len=1), parameter :: CLOCK_TICK(4) = [ "|" , "/" , "-" , "\" ]

    interface getPosInf
        module procedure :: getPosInf_RK
    end interface getPosInf

    interface getNegInf
        module procedure :: getNegInf_RK
    end interface getNegInf

    ! file extentions

    type, private       :: FileType_type
        character(6)    :: binary  = "binary"
        character(6)    :: matlab  = "MATLAB"
        character(6)    :: python  = "Python"
        character(5)    :: julia   = "Julia"
        character(5)    :: ascii   = "ASCII"
        character(1)    :: rlang   = "R"
    end type FileType_type

    type, private       :: FileExt_type
        character(4)    :: binary  = ".bin"
        character(2)    :: matlab  = ".m"
        character(3)    :: python  = ".py"
        character(3)    :: julia   = ".jl"
        character(4)    :: ascii   = ".txt"
        character(2)    :: r       = ".R"
    end type FileExt_type   

    type(FileExt_type)  , parameter :: FILE_EXT = FileExt_type()
    type(FileType_type) , parameter :: FILE_TYPE = FileType_type()

!***********************************************************************************************************************************
!***********************************************************************************************************************************

contains

!***********************************************************************************************************************************
!***********************************************************************************************************************************

    pure function getPosInf_RK() result(posInf)
        use, intrinsic :: ieee_arithmetic, only: ieee_value, ieee_positive_inf
        implicit none
        real(RK) :: posInf
        posInf = ieee_value(0._RK, ieee_positive_inf)
    end function getPosInf_RK

!***********************************************************************************************************************************
!***********************************************************************************************************************************

    pure function getNegInf_RK() result(negInf)
        use, intrinsic :: ieee_arithmetic, only: ieee_value, ieee_negative_inf
        implicit none
        real(RK) :: negInf
        negInf = ieee_value(0._RK, ieee_negative_inf)
    end function getNegInf_RK

!***********************************************************************************************************************************
!***********************************************************************************************************************************

end module Constants_mod