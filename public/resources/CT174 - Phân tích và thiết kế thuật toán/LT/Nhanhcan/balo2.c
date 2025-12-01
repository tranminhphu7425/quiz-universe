#include <stdio.h>
#include <string.h>

typedef struct
{
	char TenDV[20];
	float TL, GT, DG;
	int PA, SL;
} DoVat;

void ReadData(DoVat *a, float *W, int *n)
{
	freopen("CaiBaLo2.txt", "r", stdin);
	scanf("%f", W);
	int i = 0;
	while (!feof(stdin))
	{
		scanf("%f%f%d%[^\n]", &a[i].TL, &a[i].GT, &a[i].SL, &a[i].TenDV);
		a[i].DG = a[i].GT / a[i].TL;
		a[i].PA = 0;
		i++;
	}

	*n = i;
}

void Swap(DoVat *a, DoVat *b)
{
	DoVat temp = *a;
	*a = *b;
	*b = temp;
}

void Sort(DoVat *a, int n)
{
	for (int i = 0; i < n - 1; i++)
	{
		for (int j = n - 1; j > i; j--)
		{
			if (a[j].DG > a[j - 1].DG)
			{
				Swap(&a[j], &a[j - 1]);
			}
		}
	}
}

void PrintData(DoVat *a, float W, int n)
{
	float TongTL = 0, TongGT = 0;
	printf("Cai ba lo 2 dung ki thuat nhanh can, W  = %.2f\n", W);
	printf("|---|--------------------|---------|---------|---------|---------|----------|\n");
	printf("|STT|  Ten do vat        | T luong | Gia tri | So luong| Don gia | Phuong an|\n");
	printf("|---|--------------------|---------|---------|---------|---------|----------|\n");
	for (int i = 0; i < n; i++)
	{
		printf("|%-3d|%-20s|%-9.2f|%-9.2f|%-9d|%-9.2f|%-10d|\n", i + 1, a[i].TenDV, a[i].TL, a[i].GT, a[i].SL, a[i].DG, a[i].PA);
		TongTL += a[i].TL * a[i].PA;
		TongGT += a[i].GT * a[i].PA;
	}
	printf("|---|--------------------|---------|---------|---------|---------|----------|\n");
	printf("Phuong an theo thu tu don gia giam dan: X(");
	for (int i = 0; i < n - 1; i++)
	{
		printf("%d, ", a[i].PA);
	}
	printf("%d)", a[n - 1].PA);
	printf("\nTong trong luong: %.2f", TongTL);
	printf("\nTong gia tri: %.2f", TongGT);
}

int min(int a, int b)
{
	return a > b ? b : a;
}
void NhanhCan(int i, float *TGT, float *V, float *CT, float *GLNTT, int *x, DoVat *a, int n)
{
	int yk = min(a[i].SL, *V / a[i].TL);
	for (int j = yk; j >= 0; j--)
	{
		*TGT += j * a[i].GT;
		*V -= j * a[i].TL;
		*CT = *TGT + *V * a[i + 1].DG;
		x[i] = j;
		if (*CT > *GLNTT)
		{
			if (i == n - 1 || *V == 0)
			{
				if (*GLNTT < *TGT)
				{
					*GLNTT = *TGT;
					for (int i = 0; i < n; i++)
					{
						a[i].PA = x[i];
					}
				}
			}
			else
			{
				NhanhCan(i + 1, TGT, V, CT, GLNTT, x, a, n);
			}
		}

		x[i] = 0;
		*TGT -= j * a[i].GT;
		*V += j * a[i].TL;
	}
}

int main()
{
	int n, x[100];
	float W;
	DoVat a[100];

	ReadData(a, &W, &n);
	Sort(a, n);
	float TGT = 0, V = W, CT = V * a[0].DG, GLNTT = 0;
	NhanhCan(0, &TGT, &V, &CT, &GLNTT, x, a, n);
	PrintData(a, W, n);
	return 0;
}
