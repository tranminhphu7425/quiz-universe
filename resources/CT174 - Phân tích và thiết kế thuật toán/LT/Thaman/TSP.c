#include <stdio.h>


#define MAX_M 100

typedef struct {
	int u, v;
	float w;
} Edge;


typedef struct{
	Edge edges[MAX_M];
	int n, m;
}Graph;

void init_graph(Graph *pG, int n){
	pG -> n = n;
	pG -> m = 0;
}

void add_edge(Graph *pG, int u, int v, float w){
	if(u == v || u > v) return;
	pG -> edges[pG -> m].u = u;
	pG -> edges[pG -> m].v = v;
	pG -> edges[pG -> m].w = w;
	pG -> m++;
}


int degree(Graph *pG, int u){
	int deg_u = 0;
	for(int i = 0; i < pG -> m; i++){
		if(pG -> edges[i].u == u){
			deg_u ++;
			
		}
		if(pG -> edges[i].v == u){
			deg_u ++;
		}
	}
	return deg_u;
}

float findWeight(Graph *pG, int u, int v){
    for(int i = 0; i < pG->m; i++){
        if((pG->edges[i].u == u && pG->edges[i].v == v) ||
            (pG->edges[i].u == v && pG->edges[i].v == u))
            return pG->edges[i].w;
    }
    return -1;
}



#define MAX_N 100

int parent[MAX_N];


int findRoot(int u){
	if(parent[u] == u){
		return u;
	}
	return findRoot(parent[u]);
}

void sort(Graph *pG){
	for(int i = 0; i < pG -> m - 1; i++){
		for(int j = pG -> m-1; j > i; j--){
			if(pG -> edges[j].w < pG -> edges[j-1].w){
				Edge temp = pG -> edges[j];
				pG -> edges[j] = pG -> edges[j-1];
				pG -> edges[j-1] = temp;
			}
		}
	}
}

float Kruskal(Graph *pG, Graph *T){
	sort(pG);
	init_graph(T, pG -> n);
	for(int u = 1; u <= pG -> n; u++){
		parent[u] = u;
	}
	float sum_w = 0;
	
	for(int e = 0; e < pG -> m; e++){
		int u = pG -> edges[e].u;
		int v = pG -> edges[e].v;
		float w = pG -> edges[e].w;
		int root_u = findRoot(u);
		int root_v = findRoot(v);
		if(root_u != root_v && degree(T, u) <= 1 && degree(T, v) <= 1){
			add_edge(T, u, v, w);
			parent[root_u] = root_v;
			sum_w += w;
		}
	}
	
	int u = -1, v;
	for(int i = 1; i <= pG -> n; i++){
		if(degree(T, i) == 1){
			if(u == -1){
				u = i;
				continue;
			}
			v = i;
		}
	}
	add_edge(T, u, v, findWeight(pG, u, v));
	return sum_w + findWeight(pG, u, v);
	
}

void PrintData(Graph *pG){
	for(int i = 0; i <pG -> m; i++){
		printf("%d %c %c %.2f\n", i+1, pG -> edges[i].u + 96, pG -> edges[i].v  + 96, pG -> edges[i].w);
	}
}


void ReadData(Graph *pG){
	int n;
	float w;
	freopen("TSP.txt", "r", stdin);
	scanf("%d", &n);
	init_graph(pG, n);
	for(int i = 1; i <= n; i++){
		for(int j = 1; j <= n; j++){
			scanf("%f", &w);
			add_edge(pG, i, j , w);
		}
	}
}


int main(){
	
	Graph G, T;

	printf("Danh sach cung ban dau: \n");
	ReadData(&G);
	PrintData(&G);
	float sum_w = Kruskal(&G, &T);
	printf("Danh sach cung sau khi sap xep: \n");
	PrintData(&G);
	printf("Phuong an:\n");
	PrintData(&T);
	printf("Tong trong so: %f", sum_w);
	
}


