#include <bits/stdc++.h>
#include <ratio>

#define all(x) (x).begin(), (x).end()
#define endl "\n"
#define int long long // consider removing if needed

using namespace std;

/*
 *	author:sammas24
 *  (T_T)
 *
 * */

// For debugging
void __print(int x) { cerr << x; }
void __print(unsigned x) { cerr << x; }
void __print(unsigned long x) { cerr << x; }
void __print(unsigned long long x) { cerr << x; }
void __print(float x) { cerr << x; }
void __print(double x) { cerr << x; }
void __print(long double x) { cerr << x; }
void __print(char x) { cerr << '\'' << x << '\''; }
void __print(const char *x) { cerr << '\"' << x << '\"'; }
void __print(const string &x) { cerr << '\"' << x << '\"'; }
void __print(bool x) { cerr << (x ? "true" : "false"); }

template <typename T, typename V> void __print(const pair<T, V> &x) {
  cerr << '{';
  __print(x.first);
  cerr << ',';
  __print(x.second);
  cerr << '}';
}
template <typename T> void __print(const T &x) {
  int f = 0;
  cerr << '{';
  for (auto &i : x)
    cerr << (f++ ? "," : ""), __print(i);
  cerr << "}";
}
void _print() { cerr << "]\n"; }
template <typename T, typename... V> void _print(T t, V... v) {
  __print(t);
  if (sizeof...(v))
    cerr << ", ";
  _print(v...);
}
#ifndef ONLINE_JUDGE
#define debug(x...)                                                            \
  cerr << "[" << #x << "] = [";                                                \
  _print(x)
#else
#define debug(x...)
#endif

void state(int f, int c, int d, int idx, int defensas, int centrales,
           int delanteros, vector<string> &v, bool &found) {
  if (found)
    return;
  if (f >= defensas && c >= centrales && d >= delanteros) {
    found = true;
    return;
  }

  if (idx >= v.size())
    return;

  string s = v[idx];

  if (s.find("F") != string::npos && f < defensas)
    state(f + 1, c, d, idx + 1, defensas, centrales, delanteros, v,found);
  if (s.find("C") != string::npos && c < centrales)
    state(f, c + 1, d, idx + 1, defensas, centrales, delanteros, v,found);
  if (s.find("D") != string::npos && d < delanteros)
    state(f, c, d + 1, idx + 1, defensas, centrales, delanteros, v,found);

}

signed main() {
  ios_base::sync_with_stdio(0);
  cin.tie(NULL);

  int f, m, d;
  while (cin >> f >> m >> d) {
    if (f == 0 && m == 0 && d == 0)
      break;
    int n;
    cin >> n;

    vector<string> v;
    for (int i = 0; i < n; i++) {
      string x;
      cin >> x;
      v.push_back(x);
    }

    bool found=false;
    state(0, 0, 0, 0, f, m, d, v,found);

    if (found) {
      cout << "SI" << endl;
    } else {
      cout << "NO" << endl;
    }
  }
}
