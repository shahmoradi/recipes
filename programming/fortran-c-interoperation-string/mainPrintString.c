#include "ISO_Fortran_binding.h"
#include <string.h>

// Fortran function printString prototype
extern char* printString(CFI_cdesc_t *);

int main()
{
    char *StrVec = "This is a C string!";

    // Initialize the C descriptor as a scalar character nonpointer
    CFI_cdesc_t StrVec_desc;
    int retval = CFI_establish  ( &StrVec_desc
                                , StrVec
                                , CFI_attribute_other
                                , CFI_type_char
                                , strlen(StrVec)
                                , 0
                                , NULL
                                );

    // Call Fortran function printString
    char *success = printString(&StrVec_desc);
    printf("%s", &success);
    return 0;
}
