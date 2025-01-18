# filename: paper_sword_template.py
import svgwrite

# Define the sword dimensions
sword_length = 200  # mm
sword_width = 20  # mm
hilt_width = 30  # mm
hilt_height = 40  # mm

# Create an SVG drawing object
dwg = svgwrite.Drawing('paper_sword_template.svg', profile='tiny')

# Define the sword shape
sword_shape = dwg.rect(insert=(0, 0), size=(sword_length, sword_width), fill='none', stroke='black', stroke_width=0.5)

# Define the hilt shape
hilt_shape = dwg.rect(insert=(sword_length - hilt_width, 0), size=(hilt_width, hilt_height), fill='none', stroke='black', stroke_width=0.5)

# Add decorative elements (quilling design)
quilling_design = dwg.add(dwg.g(id='quilling-design'))
quilling_design.add(dwg.circle(center=(sword_length / 2, sword_width / 2), r=5, fill='none', stroke='black', stroke_width=0.5))
quilling_design.add(dwg.circle(center=(sword_length / 2, sword_width / 2 + 10), r=5, fill='none', stroke='black', stroke_width=0.5))
quilling_design.add(dwg.circle(center=(sword_length / 2, sword_width / 2 + 20), r=5, fill='none', stroke='black', stroke_width=0.5))

# Add the sword and hilt shapes to the drawing
dwg.add(sword_shape)
dwg.add(hilt_shape)
dwg.add(quilling_design)

# Save the SVG file
dwg.save()
