#include <stdio.h>

// The Fortran function's prototype
extern void getLowerCase(char [], char [], size_t );

int main(void)
{
    char StrVec[] = "HELLO FORTRAN! YOU ROCK!";
    size_t lenStrVec = sizeof(StrVec) / sizeof(StrVec[0]);
    char StrVecLowerCase[ lenStrVec ];

    // Everything is passed by reference to Fortran
    getLowerCase( StrVec
                , StrVecLowerCase
                , lenStrVec
                );
    printf("From Inside C: %s\n", StrVecLowerCase);
    return 0;
}
