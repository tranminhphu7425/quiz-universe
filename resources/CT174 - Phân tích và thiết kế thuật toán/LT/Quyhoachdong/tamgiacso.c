// Bai toan Tam giac so
// Du lieu cho trong file tam_giac_so.txt
// Giai bai toan bang thuat toan QUY HOACH DONG

#include <stdio.h>
#define size 50

void ReadData(int a[][size], int *n){
	FILE *f;
	f=fopen("tamgiacso.txt", "r");
	if(f==NULL){
		printf("Loi mo file!!!\n");
		return;
	}
	int i=0, j;	
	while (!feof(f)){
		for(j=0; j<=i; j++)
			fscanf(f, "%d", &a[i][j]); 
		i++;
		}
	*n=i-1;
	
	fclose(f);
}

void PrintTable(int a[][size], int n){
	
	for(int i=0; i<n; i++){
		for(int j=0; j<=i; j++)
			printf("%5d", a[i][j]);
		printf("\n");
	}
}

int max(int a, int b, int c){
	if(a >= b && a >= c) return a;
	else if(b >= a && b >= c) return b;	
	else return c;	
}

int maxIndex(int F[][size], int i, int j){
	int temp1 = 0, temp2 =0, temp3 = 0;
	if(j + 1 <= i-1) temp1 = F[i-1][j+1];
	if(j - 1 >= 0) temp2 = F[i-1][j-1];
	if(j <= i -1) temp3 = F[i-1][j];
	int max1= max(temp1, temp2, temp3);
	if(max1 == temp1) return j+1;
	else if(max1 == temp2) return j-1;
	else return j; 
}

// Dung cong thuc truy hoi de tao bang F
void Tao_Bang(int a[][size], int n, int F[][size]){

 		F[0][0]= a[0][0];
 		F[1][0]= F[0][0] + a[1][0];
 		F[1][1]= F[0][0] + a[1][1];

	 for(int i=2; i<n; i++)
		 for(int j=0; j<=i; j++){
			 F[i][j] = F[i-1][maxIndex(F,i,j)] + a[i][j];
	 }                                           
}



// Tra bang F, nhung xac dinh phuong an tu trong tam giac so (bang a)

int Tra_Bang(int a[][size], int n, int F[][size], int PA[]){
	int max = 0;
	for(int k = 0; k < n; k++){
		if(F[n-1][max] < F[n-1][k]){
			max = k;
		}
	}
	int j = max;
	PA[n-1]=a[n-1][j];
	int sum = PA[n-1];
	
	for(int i=n-1; i>=1; i--){
		j=maxIndex(F,i,j);
		PA[i-1]=a[i-1][j];
		sum+=PA[i-1];
	}
	return sum;
}


void PrintData(int a[][size], int n, int F[][size], int PA[]){

	printf("\nPhuong an la duong di qua cac so : ");
	
	int sum = Tra_Bang(a, n, F, PA);
	printf("%d", PA[0]);
	for(int i=1; i<n; i++)	printf(" => %d", PA[i]);
	printf("\n\nTong cac so tren duong di la %d\n", sum);
}	

int main(){
	int a[size][size]; //Luu tam giac so
	int n;
	
	printf("\nBai toan TAM GIAC SO dung thuat toan QUY HOACH DONG\n");
	ReadData(a,&n);
	printf("\nTAM GIAC SO da cho\n");
	PrintTable(a,n);
	
	int PA[n]; 	//Phuong an toi uu: mang co n phan tu
	int F[n][size]; 	//Bang F: mang 2 chieu co n dong, n cot
	
	Tao_Bang(a,n,F);
	printf("\nBang F da tao\n");
	PrintTable(F,n);
	PrintData(a, n, F, PA);
	
	return 0;
}