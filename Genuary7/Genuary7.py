import os
import math
import time

# Screen dimensions and basic settings
WIDTH, HEIGHT = 80, 40
ASPECT_RATIO = WIDTH / HEIGHT
BASE_SCALE = 20
FPS = 30

# Rotation speeds
ROTATE_X, ROTATE_Y, ROTATE_Z = 0.1, 0.1, 0.1
BG_ROTATE_SPEED = 0.02

# Cube structure
vertices = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
]

edges = [
    (0, 1), (1, 2), (2, 3), (3, 0),
    (4, 5), (5, 6), (6, 7), (7, 4),
    (0, 4), (1, 5), (2, 6), (3, 7)
]

def rotate(point, angle_x, angle_y, angle_z):
    x, y, z = point
    cos_x, sin_x = math.cos(angle_x), math.sin(angle_x)
    y, z = y * cos_x - z * sin_x, y * sin_x + z * cos_x
    cos_y, sin_y = math.cos(angle_y), math.sin(angle_y)
    x, z = x * cos_y + z * sin_y, -x * sin_y + z * cos_y
    cos_z, sin_z = math.cos(angle_z), math.sin(angle_z)
    x, y = x * cos_z - y * sin_z, x * sin_z + y * cos_z
    return [x, y, z]

def project(point, scale):
    x, y, z = point
    z += 5
    factor = scale / z
    x *= factor * ASPECT_RATIO
    y *= factor
    return int(WIDTH / 2 + x), int(HEIGHT / 2 - y), z

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def draw_background(buffer, angle):
    grid_spacing = 4
    for x in range(-WIDTH, WIDTH * 2, grid_spacing):
        for y in range(-HEIGHT, HEIGHT * 2, grid_spacing):
            rotated_x = x * math.cos(angle) - y * math.sin(angle)
            rotated_y = x * math.sin(angle) + y * math.cos(angle)
            screen_x = int(rotated_x % WIDTH)
            screen_y = int(rotated_y % HEIGHT)
            if 0 <= screen_x < WIDTH and 0 <= screen_y < HEIGHT:
                buffer[screen_y][screen_x] = '.'

def draw_cube(buffer, angle_x, angle_y, angle_z, scale):
    rotated_vertices = [rotate(v, angle_x, angle_y, angle_z) for v in vertices]
    projected_vertices = [project(v, scale) for v in rotated_vertices]
    for edge in edges:
        p1, p2 = projected_vertices[edge[0]], projected_vertices[edge[1]]
        draw_line(buffer, p1, p2, '#')

def draw_line(buffer, p1, p2, char):
    x1, y1, _ = p1
    x2, y2, _ = p2
    dx, dy = abs(x2 - x1), abs(y2 - y1)
    sx = 1 if x1 < x2 else -1
    sy = 1 if y1 < y2 else -1
    err = dx - dy
    while True:
        if 0 <= x1 < WIDTH and 0 <= y1 < HEIGHT:
            buffer[y1][x1] = char
        if (x1, y1) == (x2, y2):
            break
        e2 = err * 2
        if e2 > -dy:
            err -= dy
            x1 += sx
        if e2 < dx:
            err += dx
            y1 += sy

def main():
    angle_x, angle_y, angle_z = 0, 0, 0
    bg_angle = 0

    while True:
        clear_screen()
        buffer = [[' ' for _ in range(WIDTH)] for _ in range(HEIGHT)]
        draw_background(buffer, bg_angle)
        draw_cube(buffer, angle_x, angle_y, angle_z, BASE_SCALE)
        for row in buffer:
            print(''.join(row))
        angle_x += ROTATE_X
        angle_y += ROTATE_Y
        angle_z += ROTATE_Z
        bg_angle += BG_ROTATE_SPEED
        time.sleep(1 / FPS)

main()
