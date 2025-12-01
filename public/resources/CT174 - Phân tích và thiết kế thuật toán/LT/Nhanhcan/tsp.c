#include <stdio.h>

#define MAX_N 30
#define MAX_M 100

int mark[MAX_N];
int PA[MAX_N];
typedef struct {
	float w;
	int mark;
} Edge;

typedef struct {
	Edge A[MAX_N][MAX_N]; 
	int n, m;
}Graph;

void init_graph(Graph *pG, int n){
	pG -> n = n;
	pG -> m = 0;
	for(int i = 1; i <= n; i++){
		for(int j = 1; j <= n; j++){
			pG -> A[i][j].w = 0;
			pG -> A[i][j].mark = 0;
		}
	}
}

void add_edge(Graph *pG, int u, int v, float w){
	if(u == v) return;
	pG -> A[u][v].w = w;
	pG -> A[v][u].w = w;
	pG -> m++;
}


void ReadData(Graph *pG){
	freopen("TSP.txt", "r", stdin);
	int n;
	scanf("%d", &n);
	init_graph(pG, n);
	for(int i = 1; i <= pG -> n; i++){
		for(int j = 1; j <= pG -> n; j++){
			float temp;
			scanf("%f", &temp);
			add_edge(pG, i, j, temp);
		}
	}
	#ifdef _WIN32
	freopen("CON", "r", stdin);
	#endif
	
}

void PrintMatrix(Graph *pG){
	for(int i  = 1; i <= pG -> n; i++ ){
		for(int j = 1; j <= pG -> n; j++){
			printf(" %c%c =%5.2f  ",i + 96, j+96, pG -> A[i][j].w);
		
		}
		printf("\n");
	}
}

float findMinEdge(Graph *pG){
	float minEdge = 9999;
	for(int i = 1; i <= pG -> n; i++){
		for(int j = i + 1; j <= pG -> n; j++){
			if(pG -> A[i][j].w < minEdge && (pG -> A[i][j].mark == 0 && pG -> A[j][i].mark == 0)){
				minEdge = pG -> A[i][j].w;
			}
		}
	}
	return minEdge;
}



void NhanhCan(int i, float *TGT, float *CD, float *GNNTT, int *x, Graph *pG, int u, int start) {
   mark[u] = 1;
   for(int j = 1; j <= pG -> n; j++){
   		if((mark[j] == 0 && pG -> A[u][j].mark == 0) || (j == start && i == pG -> n - 1)){
			pG -> A[u][j].mark = 1;
			x[i] = j;
			*TGT += pG -> A[u][j].w ;
   			*CD = *TGT + (pG -> n - (i + 1)) * findMinEdge(pG);
   			
			
   			if (*CD < *GNNTT)
			{
				if (i == pG -> n - 1 && *GNNTT > *TGT)
				{ 
					*GNNTT = *TGT;
					for(int i = 0; i < pG -> n; i++){
						PA[i] = x[i];			
					}

				}
				else
					NhanhCan(i+1, TGT, CD, GNNTT, x, pG, j, start); // Xet nut con cua nut i
			}
			
			pG -> A[u][j].mark = 0;
			x[i] = 0;
			*TGT -= pG -> A[u][j].w ;
		
		}
   }
   mark[u] = 0;
}

int main() {
    Graph G;
    ReadData(&G);
    PrintMatrix(&G);

	while(1){
		int x[MAX_N];
		float TGT = 0, CD = G.n * findMinEdge(&G), GNNTT = 9999;
		char u;
		fflush(stdin);
        printf("Nhap nut bat dau: ");
        scanf("%c", &u);
        if(u < 'a' || u > G.n + 'a') break;
        NhanhCan(0, &TGT, &CD, &GNNTT, x, &G, u - 96, u -96);

		printf("Cac canh tim thay:\n");
		printf("%c %c = %.2f\n", u, PA[0] + 96, G.A[u-96][PA[0]].w);
		for(int i = 0; i < G.n - 1; i++){
            printf("%c %c = %.2f\n", PA[i] + 96, PA[i + 1] + 96, G.A[PA[i]][PA[i+1]].w);
        }
	

        printf("Minimum cost: %.2f\n", GNNTT);
        printf("%c", u);
        for(int i = 0; i < G.n; i++){
            printf(" -> %c", PA[i] + 96);
        }
		printf("\n");
        printf("Nhap 0 de thoat: ");
        scanf("%d", &u);
        if(u == 0) break;
        printf("\n");
		
	}
    return 0;
}








