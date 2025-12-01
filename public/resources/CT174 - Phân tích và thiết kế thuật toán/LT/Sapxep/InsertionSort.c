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

void InsertSort(recordtype *a, int n){
	for(int i = 1; i < n; i++){
		int j = i;
		while(j > 0 && a[j].key < a[j-1].key){
			Swap(&a[j], &a[j-1]);
		//hay quen
			j--;
		}
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
	InsertSort(a, n);
	printf("Sau khi sap xep:\n");
	PrintData(a, n);
	return 0;
}




