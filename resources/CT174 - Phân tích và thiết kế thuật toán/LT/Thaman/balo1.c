#include <stdio.h>
#include <string.h>

typedef struct {
	char TenDV[20];
	float TL, GT, DG;
	int PA;
	
}DoVat;


void ReadData(DoVat *a, int *n, float *W){
	freopen("CaiBalo1.TXT", "r", stdin);
	scanf("%f", W);
	int i =0;
	while(!feof(stdin))
	{
		scanf("%f%f%[^\n]", &a[i].TL, &a[i].GT, &a[i].TenDV);
		a[i].DG = a[i].GT / a[i].TL;
		a[i].PA = 0;
		i++;
	}
	*n = i;

}


void Swap(DoVat *a, DoVat *b){
	DoVat temp = *a;
	*a = *b;
	*b = temp;
}


void BubbleSort(DoVat *a, int n){
	int i,j;
	for(i=0; i < n-1; i++)
	   for (j=n-1; j>=i+1; j--){
	   	 if (a[j].DG>a[j-1].DG) 
			Swap(&a[j],&a[j-1]);
	  }   
}



void PrintData(DoVat *a, int n, float W){
	float TongTL  = 0.0, TongGT = 0.0;
	printf("Cai ba lo 1 dung ki thuat tham an, W = %.2f\n", W);
	printf("|---|--------------------|---------|---------|---------|----------|\n");
	printf("|STT|  Ten do vat        | T luong | Gia tri | Don gia | Phuong an|\n");
	printf("|---|--------------------|---------|---------|---------|----------|\n");
	for(int i = 0; i < n; i++){
		printf("|%-3d|%-20s|%-9.2f|%-9.2f|%-9.2f|%-10d|\n", i+1, a[i].TenDV, a[i].TL, a[i].GT, a[i].DG, a[i].PA);
		TongTL += a[i].TL * a[i].PA;
		TongGT += a[i].GT * a[i].PA;
		
	}
	printf("|---|--------------------|---------|---------|---------|----------|\n");
	printf("Phuong an theo thu tu don gia giam dan: X(");
	for(int i = 0; i < n-1; i++){
		printf("%d, ", a[i].PA);
		
	}
	printf("%d)", a[n-1].PA);
	printf("\nTong trong luong: %.2f", TongTL);
	printf("\nTong gia tri: %.2f", TongGT);
}

void Greedy(DoVat *a, int n, float W){
	int i = 0;
	while(i < n && W > 0){
		a[i].PA = (W/a[i].TL);
		W -= a[i].PA * a[i].TL;
		i++;
	}
}



int main(){
	
	int n; 
	float W;
	DoVat a[20];
	ReadData(a, &n, &W);
	BubbleSort(a, n);
	Greedy(a, n, W);
	PrintData(a, n, W);
	
	return 0;
	
	
}