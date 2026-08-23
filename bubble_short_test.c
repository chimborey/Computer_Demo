
#include<stdio.h>
void bubleSort(int arr[], int n) // -> n = 5
{
      for (int i = 0; i < n - 1; i++) // -> ចំនួនដងដែលត្រូវធ្វើការ
      {
            for (int j = 0; j < n - 1 - i; j++) // -> ​ដើម្បីប្តុរទីតាំង
            {
                  if (arr[j] > arr[j + 1])
                  {
                        int temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                  }
            }
            
      }
      
}
int main(){
      int list[6] = {20, 25, 15, 30, 32, 1};
      printf("Before:\n");
      for (int i = 0; i < 5; i++)
      {
           printf("%d\n", list[i]);
      }
      bubleSort(list, 6);
      printf("After:\n");
      for (int i = 0; i < 6; i++)
      {
            printf("%d\n", list[i]);
      }
      
      return 0;
      
}