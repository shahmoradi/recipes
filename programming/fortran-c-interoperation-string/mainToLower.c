#include <stdio.h>
#include <string.h>
#include <ISO_Fortran_binding.h>

// Prototype for the Fortran procedure
void ToLower( const char *, size_t, CFI_cdesc_t *, int * );

int main()
{
    int irc = 0;
    char* s = "This is a C string";

    // You may find it easier to work with the macro from ISO_Fortran_binding.h
    CFI_CDESC_T(1) str;

    // Initialize the C descriptor as a scalar character nonpointer data type
    irc = CFI_establish((CFI_cdesc_t *)&str, NULL, CFI_attribute_allocatable, CFI_type_char, sizeof(char *), (CFI_rank_t)1, NULL);
    if (irc != CFI_SUCCESS) return(irc);

    // Call the Fortran procedure for string manipulation
    ToLower( s, strlen(s), (CFI_cdesc_t *)&str, &irc );
    if (irc != 0) {
    printf("ToLower failed: irc = %d\n", irc);
    return(irc);
    }

    // Consume the modified "string" which is effectively (char *)str.base_addr
    printf("In C main\nFortran subroutine ToLower returned: %s\n", (char *)str.base_addr);

    // Free the CFI decriptor object used for Fortran-C interoperability
    irc = CFI_deallocate( (CFI_cdesc_t *)&str );
    return (irc);
}