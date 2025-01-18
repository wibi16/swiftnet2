# Install the svgwrite module
import subprocess
subprocess.run(['pip', 'install', 'svgwrite'])

# filename: paper_sword_sheath_template.py
import svgwrite

# Define the sheath dimensions
sheath_length = 220  # mm
sheath_width = 30  # mm
sheath_height = 10  # mm

# Create an SVG drawing object
dwg = svgwrite.Drawing('paper_sword_sheath_template.svg', profile='tiny')

# Define the sheath shape
sheath_shape = dwg.rect(insert=(0, 0), size=(sheath_length, sheath_width), fill='none', stroke='black', stroke_width=0.5)

# Add decorative elements (paper quilling design)
quilling_design = dwg.add(dwg.g(id='quilling-design'))
quilling_design.add(dwg.circle(center=(sheath_length / 2, sheath_width / 2), r=5, fill='none', stroke='black', stroke_width=0.5))
quilling_design.add(dwg.circle(center=(sheath_length / 2, sheath_width / 2 + 10), r=5, fill='none', stroke='black', stroke_width=0.5))
quilling_design.add(dwg.circle(center=(sheath_length / 2, sheath_width / 2 + 20), r=5, fill='none', stroke='black', stroke_width=0.5))

# Add the sheath shape to the drawing
dwg.add(sheath_shape)
dwg.add(quilling_design)

# Save the SVG file
dwg.save()
