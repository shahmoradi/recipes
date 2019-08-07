#include <stdio.h>
#include <string.h>
#include <ISO_Fortran_binding.h>

// Prototype for the Fortran procedure
void replaceStr ( const char *
                , size_t
                , const char *
                , size_t
                , const char *
                , size_t
                , CFI_cdesc_t *
                , int *
                );

int main()
{
    char* string = "This is a C string";
    char* search = " ";
    char* substitute = "";

    printf("@C@main(): string pass to Fortran = %s\n", string);

    // You may find it easier to work with the macro from ISO_Fortran_binding.h
    CFI_CDESC_T(1) stringModified;

    // Initialize the C descriptor as a scalar character nonpointer data type
    int ierr = CFI_establish( (CFI_cdesc_t *)&stringModified
                            , NULL
                            , CFI_attribute_allocatable
                            , CFI_type_char
                            , sizeof(char *)
                            , (CFI_rank_t)1
                            , NULL
                            );
    if (ierr != CFI_SUCCESS) return(ierr);

    // Call the Fortran procedure for string manipulation
    replaceStr  ( string
                , strlen(string)
                , search
                , strlen(search)
                , substitute
                , strlen(substitute)
                , (CFI_cdesc_t *)&stringModified
                , &ierr
                );
    if (ierr != 0) {
        printf("Fortran allocation failed: ierr = %d\n", ierr);
        return(ierr);
    }

    // Consume the modified "string" which is effectively (char *)stringModified.base_addr
    printf("@C@main(): modified allocatable string received from Fortran subroutine replaceStr = %s\n", (char *)stringModified.base_addr);

    // Free the CFI decriptor object used for Fortran-C interoperability
    ierr = CFI_deallocate( (CFI_cdesc_t *)&stringModified );
    return (ierr);
}