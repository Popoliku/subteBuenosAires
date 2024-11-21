import tkinter as tk
from tkinter import ttk
import networkx as nx
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

# Crear el grafo de la red del metro
G = nx.Graph()

# Estaciones y sus posiciones (simulando un mapa de metro)
stations = {
    "Retiro": (8, 8), "General San Martin": (7.6, 7.6), "C": (7.2, 6.8), "D": (3, 0), "E": (4, 0),  # Línea Azul
    "F": (1.5, 1), "G": (2, 2),  # Intersecciones
    "H": (1, 2), "I": (0, 2),  # Línea Verde
    "J": (3, 2), "K": (4, 2),  # Línea Roja
    "L": (2, 3), "M": (2, 4)   # Línea Morada
}

# Conexiones con colores específicos
connections = [
    ("Retiro", "General San Martin", "blue"), ("General San Martin", "C", "blue"), ("C", "D", "blue"), ("D", "E", "blue"),
    ("C", "F", "green"), ("F", "G", "green"), ("G", "H", "green"), ("H", "I", "green"),
    ("G", "J", "red"), ("J", "K", "red"),
    ("G", "L", "purple"), ("L", "M", "purple")
]

# Añadir nodos con posiciones
for station, pos in stations.items():
    G.add_node(station, pos=pos)

# Añadir conexiones con colores
for u, v, color in connections:
    G.add_edge(u, v, color=color)

# Función para calcular el camino más corto
def calculate_shortest_path():
    start = combobox_start.get()
    end = combobox_end.get()
    
    if start not in G.nodes or end not in G.nodes:
        lbl_result.config(text="Error: Una o ambas estaciones no son válidas.", fg="red")
        return
    
    try:
        shortest_path = nx.shortest_path(G, source=start, target=end)
        lbl_result.config(
            text=f"El camino más corto es: {' → '.join(shortest_path)}",
            fg="green"
        )
        highlight_path(shortest_path)
    except nx.NetworkXNoPath:
        lbl_result.config(text="No hay un camino entre estas estaciones.", fg="red")

# Función para resaltar el camino más corto en el grafo
def highlight_path(path):
    
    
    # Resaltar el camino más corto
    edges = [(path[i], path[i+1]) for i in range(len(path)-1)]
    nodes = [path[i] for i in range(len(path)-1)]
    #nx.draw_networkx_edges(G, pos, edgelist=edges, edge_color='black', width=2, ax=ax)  # Aristas más gruesas
    for u in nodes:
        nx.draw_networkx_nodes(G, pos, nodelist=u, node_color='white', edgecolors='gray', node_size=300, linewidths=1, ax=ax)
    canvas.draw()

# Función para dibujar el grafo estilo mapa de metro

def draw_graph():
    # Dibujar los nodos con un contorno más grueso
    edges = G.edges(data=True)
    for u, v, attr in edges:
        color = attr.get("color")
        nx.draw_networkx_nodes(G, pos, nodelist=[u,v], node_color="white", edgecolors=color, node_size=90, ax=ax)
    
    # Dibujar las aristas con colores específicos (más gruesas)
    for u, v, attr in edges:
        color = attr.get("color")  # Color de la línea
        nx.draw_networkx_edges(G, pos, edgelist=[(u, v)], edge_color=color, width=10, ax=ax)  # Aristas más gruesas
    
    # Dibujar las etiquetas fuera de los nodos
    adjusted_labels = {node: (coords[0]+0.2, coords[1] + 0.2) for node, coords in pos.items()}
    text = nx.draw_networkx_labels(G, adjusted_labels, ax=ax, font_size=8, font_color="black")
    for _, t in text.items():
        t.set_rotation(40) #rota los textos

# Crear la ventana principal
root = tk.Tk()
root.title("Mapa de Metro Interactivo")

# Crear el marco para los controles de entrada
frame_inputs = tk.Frame(root)
frame_inputs.pack(pady=10)

# Etiquetas para los comboboxes
tk.Label(frame_inputs, text="Estación de salida:").grid(row=0, column=0, padx=5, pady=5)
tk.Label(frame_inputs, text="Estación de meta:").grid(row=1, column=0, padx=5, pady=5)

# Crear comboboxes para seleccionar la estación de salida y meta
stations_list = list(stations.keys())  # Lista de estaciones

combobox_start = ttk.Combobox(frame_inputs, values=stations_list, width=10, state="readonly")
combobox_start.grid(row=0, column=1, padx=5, pady=5)
combobox_start.set(stations_list[0])  # Establecer un valor predeterminado

combobox_end = ttk.Combobox(frame_inputs, values=stations_list, width=10, state="readonly")
combobox_end.grid(row=1, column=1, padx=5, pady=5)
combobox_end.set(stations_list[1])  # Establecer un valor predeterminado

# Botón para calcular el camino más corto
btn_calculate = tk.Button(frame_inputs, text="Calcular Camino", command=calculate_shortest_path)
btn_calculate.grid(row=2, column=0, columnspan=2, pady=10)

# Crear etiqueta para mostrar el resultado
lbl_result = tk.Label(root, text="El camino más corto aparecerá aquí.", fg="blue")
lbl_result.pack(pady=10)

# Crear el gráfico del mapa
fig, ax = plt.subplots(figsize=(10,10))
plt.axis('off')
pos = nx.get_node_attributes(G, 'pos')  # Usar las posiciones predefinidas
draw_graph()

canvas = FigureCanvasTkAgg(fig, master=root)
canvas_widget = canvas.get_tk_widget()
canvas_widget.pack()

# Iniciar la interfaz
root.mainloop()
