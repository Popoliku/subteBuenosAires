import pandas as pd

csv_file = "estaciones-de-subte.csv" 
data = pd.read_csv(csv_file)

line_delimited_json = data.to_json(orient="records", lines=True)

json_array = "[\n" + line_delimited_json.replace("\n", ",\n").rstrip(",\n") + "\n]"

with open("output.json", "w") as json_file:
    json_file.write(json_array)

print(json_array)
