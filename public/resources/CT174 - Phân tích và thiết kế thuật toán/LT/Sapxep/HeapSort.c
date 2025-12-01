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



void PushDown(recordtype *a, int first, int last){
    int r = first;
    while(r <= (last - 1)/2){
        if(last == 2*r+1) {
            if(a[r].key < a[last].key) Swap(&a[r], &a[last]);
            return;
        }
        else{
            if(a[r].key < a[2*r+1].key && a[2*r+1].key >= a[2*r+2].key) {
                Swap(&a[r], &a[2*r+1]);
                r = 2*r+1;
            }
            else{
                if (a[r].key < a[2*r+2].key) {
                    Swap(&a[r], &a[2*r+2]);
                    r = 2*r+2;
            	}
                else return ;
                
            }
               
        }
    }
}





void HeapSort(recordtype *a, int n){
	for(int i = (n-2)/2; i>= 0; i--){
		PushDown(a, i, n-1);
	}
	
	for(int i = n-1;i >= 2; i--){
		Swap(&a[0], &a[i]);
		PushDown(a, 0, i-1);
	}
	
	Swap(&a[0], &a[1]);
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
	HeapSort(a, n);
	printf("Sau khi sap xep:\n");
	PrintData(a, n);
	return 0;
	
}




