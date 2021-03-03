#include "demo.h"
int sum(int size)
{
    int i;
    int result = 0;
    for(i=0;i<size;i++){
         result += i;
    }
    return result;
}