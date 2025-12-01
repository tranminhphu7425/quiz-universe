#include <stdio.h>

typedef struct {
	int key;
	float otherfields;
	
} recordtype;


void Swap(recordtype *a, recordtype *b){
	recordtype temp = *a;
	*a = *b;
	*b= temp;
}

void SelectionSort(recordtype *a, int n){
	int lowindex;
	for(int i = 0 ; i < n-1; i++){
		lowindex = i;
		for(int j = i + 1; j < n; j++){
			if(a[j].key < a[lowindex].key){
				lowindex = j;
			}
		}
		Swap(&a[lowindex], &a[i]);
	}
}


void ReadData(recordtype *a, int *n){
	int count = 0;
	freopen("data.txt", "r", stdin);
	while(!feof(stdin)){
		scanf("%d %f", &a[count].key, &a[count].otherfields);
		count ++;
		
	}
	*n = count;
	
}



void PrintData(recordtype *a, int n){
	for(int i =0; i < n; i++){
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
	SelectionSort(a, n);
	printf("Sau khi sap xep:\n");
	PrintData(a, n);
	return 0;
}

