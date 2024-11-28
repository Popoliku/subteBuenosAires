#include<bits/stdc++.h>

#define all(x) (x).begin(), (x).end()
#define endl "\n"
#define int long long //consider removing if needed

using namespace std;

/*
 *	author:sammas24
 *  (T_T)
 *
 * */

int ans = 0;
int cc=0;
vector<vector<int>> adj;
vector<bool> visited;


void dfs(int node){
    if(visited[node]) return;
    visited[node]=true;
    cc++;
    ans=max(ans,cc);
    for(int x : adj[node]){
        dfs(x);
    }

}

signed main(){
    ios_base::sync_with_stdio(0);
    cin.tie(NULL);

    int t; cin >> t;
    while(t--){
        int n,m; cin >> n >> m;

        adj.resize(n + 1);
        visited.resize(n + 1);
        ans=0;

        for(int i = 0; i<m;i++){
            int x,y; cin >> x >> y;
            adj[x].push_back(y);
            adj[y].push_back(x);
        }

        for(int i = 1; i<=n;i++){
            if(!visited[i]){
                cc=0;
                dfs(i);
            }
        }
        cout << ans << endl;
        adj.clear();
        visited.clear();      
    }
}