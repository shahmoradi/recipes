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

module Math_mod

    implicit none

    character(*), parameter :: MODULE_NAME = "@Math_mod"

    interface getCumSum
        module procedure :: getCumSum_IK, getCumSum_RK
    end interface getCumSum

    interface getCumSumReverse
        module procedure :: getCumSumReverse_IK, getCumSumReverse_RK
    end interface getCumSumReverse

    interface getLogSumExp
        module procedure :: getLogSumExp_RK, getLogSumExp_CK
    end interface getLogSumExp

    interface getLogSubExp
        module procedure :: getLogSubExp_RK
    end interface getLogSubExp

    interface getLogEggBox
        module procedure :: getLogEggBoxSD_RK, getLogEggBoxMD_RK
        module procedure :: getLogEggBoxSD_CK, getLogEggBoxMD_CK
    end interface getLogEggBox
  
!***********************************************************************************************************************************
!***********************************************************************************************************************************

contains

!***********************************************************************************************************************************
!***********************************************************************************************************************************

    function getDistanceSq(nd,Point1,Point2) result(distanceSq)
#if defined DLL_ENABLED && !defined CFI_ENABLED
        !DEC$ ATTRIBUTES DLLEXPORT :: getDistanceSq
#endif
        use, intrinsic :: iso_fortran_env, only: output_unit
        use Constants_mod, only: IK, RK
        use String_mod, only: num2str
        integer(IK) , intent(in)    :: nd
        real(RK)    , intent(in)    :: Point1(nd),Point2(nd)
        real(RK)                    :: distanceSq
        integer(IK)                 :: i
        distanceSq = 0._RK
        do i = 1, nd
            distanceSq = distanceSq + (Point2(i)-Point1(i))**2
        end do
        write(output_unit, "(*(g0,:,' '))") "The distance between the two", num2str(nd)//"-dimensional points is", distanceSq
    end function getDistanceSq

!***********************************************************************************************************************************
!***********************************************************************************************************************************

    ! returns the correlation coefficient (-1<corCoef<1) corresponding to the input Fisher z-transformation.
    pure elemental function getCorCeofFromFisherTrans(fisherTrans) result(corCoef)
#if defined DLL_ENABLED && !defined CFI_ENABLED
        !DEC$ ATTRIBUTES DLLEXPORT :: getCorCeofFromFisherTrans
#endif
        use Constants_mod, only: RK
        real(RK), intent(in) :: fisherTrans
        real(RK)             :: corCoef
        corCoef = tanh(fisherTrans)
    end function getCorCeofFromFisherTrans

    ! returns Fisher z-transformation of an input correlation coefficient (-1<corCoef<1).
    pure elemental function getFisherTransFromCorCoef(corCoef) result(fisherTrans)
#if defined DLL_ENABLED && !defined CFI_ENABLED
        !DEC$ ATTRIBUTES DLLEXPORT :: getFisherTransFromCorCoef
#endif
        use Constants_mod, only: RK
        real(RK), intent(in) :: corCoef
        real(RK)             :: fisherTrans
        fisherTrans = atanh(corCoef)
    end function getFisherTransFromCorCoef

!***********************************************************************************************************************************
!***********************************************************************************************************************************

    pure function getCumSum_IK(vecLen,Vec) result(CumSum)
#if defined DLL_ENABLED && !defined CFI_ENABLED
        !DEC$ ATTRIBUTES DLLEXPORT :: getCumSum_IK
#endif
        use Constants_mod, only: IK
        integer(IK), intent(in) :: vecLen
        integer(IK), intent(in) :: Vec(vecLen)
        integer(IK)             :: CumSum(vecLen)
        integer(IK)             :: i
        CumSum(1) = Vec(1)
        do i = 2, vecLen
            CumSum(i) = CumSum(i-1) + Vec(i)
        end do
    end function getCumSum_IK

    pure function getCumSum_RK(vecLen,Vec) result(CumSum)
#if defined DLL_ENABLED && !defined CFI_ENABLED
        !DEC$ ATTRIBUTES DLLEXPORT :: getCumSum_RK
#endif
        use Constants_mod, only: IK, RK
        integer(IK), intent(in) :: vecLen
        real(RK)   , intent(in) :: Vec(vecLen)
        real(RK)                :: CumSum(vecLen)
        integer(IK)             :: i
        CumSum(1) = Vec(1)
        do i = 2, vecLen
            CumSum(i) = CumSum(i-1) + Vec(i)
        end do
    end function getCumSum_RK

!***********************************************************************************************************************************
!***********************************************************************************************************************************

    pure function getCumSumReverse_IK(vecLen,Vec) result(CumSum)
#if defined DLL_ENABLED && !defined CFI_ENABLED
        !DEC$ ATTRIBUTES DLLEXPORT :: getCumSumReverse_IK
#endif
        use Constants_mod, only: IK
        integer(IK), intent(in) :: vecLen
        integer(IK), intent(in) :: Vec(vecLen)
        integer(IK)             :: CumSum(vecLen)
        integer(IK)             :: i, indx
        CumSum(1) = Vec(vecLen)
        do i = vecLen-1,1,-1
            indx = vecLen - i
            CumSum(indx+1) = CumSum(indx) + Vec(i)
        end do
    end function getCumSumReverse_IK

    pure function getCumSumReverse_RK(vecLen,Vec) result(CumSum)
#if defined DLL_ENABLED && !defined CFI_ENABLED
        !DEC$ ATTRIBUTES DLLEXPORT :: getCumSumReverse_RK
#endif
        use Constants_mod, only: IK, RK
        integer(IK), intent(in) :: vecLen
        real(RK)   , intent(in) :: Vec(vecLen)
        real(RK)                :: CumSum(vecLen)
        integer(IK)             :: i, indx
        CumSum(1) = Vec(vecLen)
        do i = vecLen-1,1,-1
            indx = vecLen - i
            CumSum(indx+1) = CumSum(indx) + Vec(i)
        end do
    end function getCumSumReverse_RK

!***********************************************************************************************************************************
!***********************************************************************************************************************************

    pure function getLogSubExp_RK(logFunc1,logFunc2) result(logSubExp)
#if defined DLL_ENABLED && !defined CFI_ENABLED
        !DEC$ ATTRIBUTES DLLEXPORT :: getLogSubExp_RK
#endif
        ! returns log( exp(logFunc1) - exp(logFunc2) ) robustly
        ! onus is on the user to ensure logFunc1 > logFunc2. To ensure wrong input does not go unnoticed
        use Constants_mod, only: RK
        real(RK)   , intent(in) :: logFunc1, logFunc2
        real(RK)                :: logSubExp
        logSubExp = logFunc1 + log( 1._RK - exp(logFunc2-logFunc1) )
    end function getLogSubExp_RK

!***********************************************************************************************************************************
!***********************************************************************************************************************************

    pure function getLogSumExp_RK(nFunc,LogFunc)
#if defined DLL_ENABLED && !defined CFI_ENABLED
        !DEC$ ATTRIBUTES DLLEXPORT :: getLogSumExp_RK
#endif
        use Constants_mod, only: IK, RK, LOGTINY_RK
        integer(IK), intent(in) :: nFunc
        real(RK)   , intent(in) :: LogFunc(nFunc)
        real(RK)                :: getLogSumExp_RK
        real(RK)                :: LogFuncCopy(nFunc)
        real(RK)                :: normFac
        integer(IK)             :: i
        normFac = maxval(LogFunc)
        LogFuncCopy = LogFunc - normFac
        do concurrent(i=1:nFunc)
            if (LogFuncCopy(i)<LOGTINY_RK) then
                LogFuncCopy(i) = 0._RK
            else
                LogFuncCopy(i) = exp(LogFuncCopy(i))
            end if
        end do
        getLogSumExp_RK = normFac + log(sum(LogFuncCopy))
    end function getLogSumExp_RK

!***********************************************************************************************************************************
!***********************************************************************************************************************************

    pure function getLogSumExp_CK(nFunc,LogFunc)
#if defined DLL_ENABLED && !defined CFI_ENABLED
        !DEC$ ATTRIBUTES DLLEXPORT :: getLogSumExp_CK
#endif
        use Constants_mod, only: IK, RK, LOGTINY_RK
        integer(IK), intent(in) :: nFunc
        complex(RK), intent(in) :: LogFunc(nFunc)
        complex(RK)             :: getLogSumExp_CK
        complex(RK)             :: LogFuncCopy(nFunc)
        complex(RK)             :: normFac
        integer(IK)             :: i
        normFac = maxval(real(LogFunc))
        LogFuncCopy = LogFunc - normFac
        do concurrent(i=1:nFunc)
            if (real(LogFuncCopy(i))<LOGTINY_RK) then
                LogFuncCopy(i) = 0._RK
            else
                LogFuncCopy(i) = exp(LogFuncCopy(i))
            end if
        end do
        getLogSumExp_CK = normFac + log(sum(LogFuncCopy))
    end function getLogSumExp_CK

!***********************************************************************************************************************************
!***********************************************************************************************************************************

    pure function getLogEggBoxSD_RK(constant,exponent,coef,point) result(logEggBox)
#if defined DLL_ENABLED && !defined CFI_ENABLED
        !DEC$ ATTRIBUTES DLLEXPORT :: getLogEggBoxSD_RK
#endif
        ! This simple function returns the log (in natural Neper base) of the EggBox function for nd > 1.
        use Constants_mod, only: IK, RK
        implicit none
        real(RK), intent(in) :: constant
        real(RK), intent(in) :: exponent
        real(RK), intent(in) :: Coef
        real(RK), intent(in) :: Point
        real(RK)             :: logEggBox
        logEggBox = exponent * log( constant + cos(coef*point) )
    end function getLogEggBoxSD_RK

!***********************************************************************************************************************************
!***********************************************************************************************************************************

    pure function getLogEggBoxSD_CK(constant,exponent,coef,point) result(logEggBox)
#if defined DLL_ENABLED && !defined CFI_ENABLED
        !DEC$ ATTRIBUTES DLLEXPORT :: getLogEggBoxSD_CK
#endif
        ! This simple function returns the log (in natural Neper base) of the EggBox function for nd > 1.
        use Constants_mod, only: IK, RK
        implicit none
        complex(RK), intent(in) :: constant
        complex(RK), intent(in) :: exponent
        complex(RK), intent(in) :: Coef
        complex(RK), intent(in) :: Point
        complex(RK)             :: logEggBox
        logEggBox = exponent * log( constant + cos(coef*point) )
    end function getLogEggBoxSD_CK

!***********************************************************************************************************************************
!***********************************************************************************************************************************

    pure function getLogEggBoxMD_RK(nd,constant,exponent,Coef,Point) result(logEggBox)
#if defined DLL_ENABLED && !defined CFI_ENABLED
        !DEC$ ATTRIBUTES DLLEXPORT :: getLogEggBoxMD_RK
#endif
        ! This simple function returns the log (in natural Neper base) of the EggBox function for nd > 1.
        use Constants_mod, only: IK, RK
        implicit none
        integer(IK), intent(in) :: nd
        real(RK), intent(in) :: constant
        real(RK), intent(in) :: exponent
        real(RK), intent(in) :: Coef(nd)
        real(RK), intent(in) :: Point(nd)
        real(RK)             :: logEggBox
        integer(IK)          :: i
        logEggBox = 0._RK
        do i = 1,nd
            logEggBox = logEggBox * cos(Coef(i)*Point(i))
        end do
        logEggBox = exponent * log( constant + logEggBox )
    end function getLogEggBoxMD_RK

!***********************************************************************************************************************************
!***********************************************************************************************************************************

    pure function getLogEggBoxMD_CK(nd,constant,exponent,Coef,Point) result(logEggBox)
#if defined DLL_ENABLED && !defined CFI_ENABLED
        !DEC$ ATTRIBUTES DLLEXPORT :: getLogEggBoxMD_CK
#endif
        ! This simple function returns the log (in natural Neper base) of the EggBox function for nd > 1.
        use Constants_mod, only: IK, RK
        implicit none
        integer(IK), intent(in) :: nd
        complex(RK), intent(in) :: constant
        complex(RK), intent(in) :: exponent
        complex(RK), intent(in) :: Coef(nd)
        complex(RK), intent(in) :: Point(nd)
        complex(RK)             :: logEggBox
        integer(IK)          :: i
        logEggBox = 0._RK
        do i = 1,nd
            logEggBox = logEggBox * cos(Coef(i)*Point(i))
        end do
        logEggBox = exponent * log( constant + logEggBox )
    end function getLogEggBoxMD_CK

!***********************************************************************************************************************************
!***********************************************************************************************************************************

    ! calculates the Gamma function for a whole integer input. This is basically gamma(intNum+1)
    pure function getFactorial(intNum)
#if defined DLL_ENABLED && !defined CFI_ENABLED
        !DEC$ ATTRIBUTES DLLEXPORT :: getFactorial
#endif
        use Constants_mod, only: IK, RK
        implicit none
        integer(IK), intent(in) :: intNum
        integer(IK)             :: i
        real(RK)                :: getFactorial
        getFactorial = 1._RK
        do i = 2,intNum
            getFactorial = getFactorial * i
        end do
    end function getFactorial

!***********************************************************************************************************************************
!***********************************************************************************************************************************

end module Math_mod