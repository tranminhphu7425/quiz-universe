#include <stdio.h>
#include <stdlib.h>


typedef struct {
    int key;
    float otherfields;
} recordtype;

void Swap(recordtype *a, recordtype *b) {
    recordtype temp = *a;
    *a = *b;
    *b = temp;
}

int FindPivot(recordtype *a, int i , int j){
    for(int u = i; u < j; u++){
        if(a[u].key != a[u+1].key){
           return a[u+1].key > a[u].key ? u+1: i;
        }
    }
    return -1;
}

int Partition(recordtype *a, int i, int j, int pivot) {
    int L = i, R = j;
    while (L <= R) {
        while (a[L].key < pivot) L++;  
        while (a[R].key >= pivot) R--;  
        if (L < R) {
            Swap(&a[L], &a[R]);
        }
    }

    return L;
}

void QuickSort(recordtype *a, int i, int j) {
    if (i >= j) return;  

    int pivotIndex = FindPivot(a, i, j);
    if (pivotIndex == -1) return;  

    int k = Partition(a, i, j, a[pivotIndex].key);

    QuickSort(a, i, k - 1);
    QuickSort(a, k, j);
}

void ReadData(recordtype a[], int *n){
    
    int count = 0;
    freopen("data.txt", "r", stdin);
    while(!feof(stdin)){
        scanf("%d %f", &a[count].key, &a[count].otherfields);
        count++;
    }
    *n = count;
}


void PrintData(recordtype *a, int n){
	for(int i = 0; i < n; i++){
		printf("%d %.2f\n", a[i].key, a[i].otherfields);
		
	}
	printf("\n");
}


int main(){
	recordtype a[100];
	int n;
	ReadData(a, &n);
	printf("Truoc khi sap xep:\n");
	PrintData(a, n);
	QuickSort(a, 0, n-1);
	printf("Sau khi sap xep:\n");
	PrintData(a, n);
	return 0;
	
}

