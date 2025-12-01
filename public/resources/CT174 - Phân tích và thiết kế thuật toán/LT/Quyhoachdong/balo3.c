#include <stdio.h>
#include <string.h>

typedef struct {
	char TenDV[20];
	int TL, GT, PA;
} DoVat;

typedef int bang[50][100];


void ReadData(DoVat *a, int *W, int *n){
	freopen("CaiBalo3.TXT", "r", stdin);
	scanf("%d", W);
	
	int i = 0;
	while(!feof(stdin)){
		scanf("%d%d%[^\n]", &a[i].TL, &a[i].GT, &a[i].TenDV);
		a[i].PA = 0;
		i++;
	}
	*n = i;
}

void Ina(DoVat *a ,int n, int W){
	int i, TongTL=0, TongGT=0;
	printf("\nPhuong an Cai Ba lo 3 dung thuat toan QUY HOACH DONG nhu sau:\n");
		printf("|---|------------------|----------|---------|-----------|\n");
		printf("|STT|     Ten Do Vat   | T Luong  | Gia Tri | Phuong an |\n");
		printf("|---|------------------|----------|---------|-----------|\n");
	for(i=0;i<n;i++){
		printf("|%2d |%-18s|%5d     |%5d    |%6d     |\n",
		i+1,a[i].TenDV,a[i].TL,a[i].GT,a[i].PA);
		TongTL=TongTL+a[i].PA * a[i].TL;
		TongGT=TongGT+a[i].PA * a[i].GT;
	}	
	printf("|---|------------------|----------|---------|-----------|\n");	
	printf("Trong luong cua ba lo = %-9d\n",W);
	printf("Tong trong luong = %-9d\n",TongTL);
	printf("Tong gia tri = %-9d\n",TongGT);
}

int min(int a, int b){
	return a < b? a : b;
}

void TaoBang(DoVat *a, int n, int W, bang F, bang X){
	int FMax, XMax;
	
	for(int V = 0; V <= W; V ++){
		X[0][V]  = V/a[0].TL;
		F[0][V] = X[0][V] * a[0].GT;
	}
	
	for(int k = 1; k < n; k++){
		for(int V = 0; V <= W; V++){
			FMax = F[k-1][V];
			XMax = 0;
			int yk = min(V/a[k].TL, 1);
			for(int xk = 1; xk <= yk; xk++){
				if(F[k-1][V-xk*a[k].TL] + xk * a[k].GT > FMax){
					FMax=F[k-1][V-xk*a[k].TL]+xk*a[k].GT;
			 		XMax= xk;
				}
			}
			F[k][V]  = FMax;
			X[k][V] = XMax;
		}
	}

	
}

void InBang(int n, int W, bang F, bang X){
	int V, k;
	for(k=0; k<n; k++){
		for(V=0; V<=W; V++)
		 	printf("|%4d%2d",F[k][V], X[k][V]);
		printf("\n");
	}
}

void TraBang(DoVat *a, int n, int W, bang X){
	int V = W;
	for(int k = n-1; k >= 0; k--){
		a[k].PA = X[k][V];
		V = V - X[k][V] * a[k].TL;
	}
}


int main(){
	int n, W;
	bang X, F;
	DoVat a[100];
	ReadData(a, &W, &n);
	
	TaoBang(a, n, W, F, X);
	InBang(n, W, F, X);
	printf("\n");
	TraBang(a, n, W, X);
	Ina(a, n, W);
	
	return 0;
}


