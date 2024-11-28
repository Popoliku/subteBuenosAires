#include<bits/stdc++.h>

using namespace std;

void state(int f, int c, int d, int idx,int def, int cent, int del, vector<string> &v, bool &found){
    if(found) return;

    if(f >= def && c >= cent && d >= del){
        found=true;
        return;
    }
    
    if(idx >= v.size()) return;
    string s = v[idx];


    bool skip=true;

    if((s == "F" || s.find("F") != string::npos) && f < def){
        state(f + 1, c,d,idx + 1,def,cent,del,v,found);
        skip=false;
    }
    if((s == "C" || s.find("C") != string::npos) && c < cent){
        state(f, c + 1,d,idx + 1,def,cent,del,v,found);
        skip=false;
    }
    if((s == "D" || s.find("D") != string::npos) && d < del){
        state(f, c,d + 1,idx + 1,def,cent,del,v,found);
        skip=false;
    }

    if(skip)
        state(f,c,d,idx + 1, def,cent,del,v,found);
}

int main(){
    ios_base::sync_with_stdio(0);
    cin.tie(NULL);

    int f,c,d;
    while(cin >> f >> c >> d){
        if(f == 0 && c == 0 && d == 0) break;
        int n; cin >> n;

        vector<string> v(n);
        
        for(int i = 0; i <n;i++){
            cin >> v[i];
        }

        bool found=false;
        state(0,0,0,0,f,c,d,v,found);

        if(found){
            cout << "SI\n";
        }else{
            cout << "NO\n";
        }
    }
}