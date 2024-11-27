#include<bits/stdc++.h>

#define int long long

using namespace std;

signed main(){
    ios_base::sync_with_stdio(0);
    cin.tie(NULL);

    int n; 
    while(cin >> n){
        vector<int> ms;

        for(int i = 0; i<n;i++){
            int x; cin >> x;
            if(ms.empty()) ms.push_back(x);
            else{
                auto it = upper_bound(ms.begin(),ms.end(),x);
                if(it == ms.end())ms.push_back(x);
                else{
                    *it = x;  //this maintains the order because you are substituing x in a value > than it. That means the previous element is <= x => maintains non increasing order
                }
            }
        }
        cout << ms.size() << endl;
    }
    return 0;
}