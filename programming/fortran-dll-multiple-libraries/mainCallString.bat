:: silence cmd output
@echo off

setlocal EnableDelayedExpansion

REM del *.mod *.obj *.pdb *.ilk *.smod *.lib

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: set up the compiler flags
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

REM compiler flags to generate code in debug mode
REM SET OPTIMIZATION_FLAGS=/debug:full /CB /Od /standard-semantics /Qinit:snan /Qdiag-error-limit:10 /debug-parameters:all /warn:all,nounused /warn:interfaces /traceback /check:all /check:stack /libs:dll /threads /dbglibs

REM compiler flags to generate fast code
SET OPTIMIZATION_FLAGS=/O3 /Qipo /fpe:0 /standard-semantics

REM define the preprocessor flag to include the Intel specific directives to export the procedure names
set FPP_FLAGS=/fpp /define:DLL_ENABLED

REM DLL library flags
set LIB_FLAGS=/libs:dll /threads

echo.
echo. -- Build Script -         optimization flags: OPTIMIZATION_FLAGS=!OPTIMIZATION_FLAGS!
echo. -- Build Script - Fortran preprocessor flags:          FPP_FLAGS=!FPP_FLAGS!
echo. -- Build Script -      Fortran library flags:          LIB_FLAGS=!LIB_FLAGS!
echo.

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: generate executable that uses the String module
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

REM generate the string dynamic (DLL) library

ifort /dll !LIB_FLAGS! !OPTIMIZATION_FLAGS! !FPP_FLAGS! Constants_mod.f90 JaggedArray_mod.f90 String_mod.f90 /exe:string

REM it is essential to pass the same compiler and library flags as the ones used for compiling the DLL

ifort !LIB_FLAGS! !OPTIMIZATION_FLAGS! mainCallString.f90 string.lib /exe:mainCallString.exe
