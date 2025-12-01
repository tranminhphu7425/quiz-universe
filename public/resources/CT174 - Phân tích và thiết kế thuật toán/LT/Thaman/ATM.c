#include <stdio.h>
#include <string.h>

typedef struct {
	char TenTien[25];
	int MG, PA;
} Tien;

void ReadData(Tien *a, int *n){
	freopen("ATM.txt", "r", stdin);
	int count = 0;
	while(!feof(stdin)){
		scanf("%d %[^\n]", &a[count].MG, &a[count].TenTien);
		count ++;
	}
	*n = count;
}


void Swap(Tien *a, Tien *b){
	Tien temp = *a;
	*a = *b;
	*b = temp;
}

void BubbleSort(Tien *a, int n){
	for(int i = 0; i < n-1; i++){
		for(int j = n-1; j > i; j--){
			if(a[j].MG > a[j-1].MG)
				Swap(&a[j], &a[j-1]);
		}
	}
}



void PrintData(Tien *a, int n, int TienCanRut){
	int TongTienTra = 0;
	int count = 1;
	printf("|---|-------------------------|---------|---------|----------|\n");
	printf("|STT|  Loai tien              |Menh gia |  So to  |Thanh tien|\n");
	printf("|---|-------------------------|---------|---------|----------|\n");
	for(int i = 0; i < n; i++){
		if(a[i].PA != 0){
			printf("|%-3d|%-25s|%-9d|%-9d|%-10d|\n", count, a[i].TenTien, a[i].MG, a[i].PA, a[i].MG * a[i].PA);
			TongTienTra += a[i].MG * a[i].PA;
			count ++;
		}	
		else continue;
	}
	printf("|---|-------------------------|---------|---------|----------|\n");
	printf("So tien can rut = %9d\n", TienCanRut);
	printf("So tien da tra = %9d", TongTienTra);
}




void Greedy(Tien *a, int n, int TienCanRut){
	int i = 0;
	while(i < n && TienCanRut > 0){
		a[i].PA = TienCanRut / a[i].MG;
		TienCanRut = TienCanRut - a[i].PA * a[i].MG;
		i++;
	}
}




int main(){
	int n;
	int TienCanRut;
	Tien a[100];
	printf("Nhap so tien can rut: ");
	scanf("%d", &TienCanRut);
	ReadData(a, &n);
	BubbleSort(a, n);
	Greedy(a, n, TienCanRut);
	PrintData(a, n, TienCanRut);
	return 0;
	
}

