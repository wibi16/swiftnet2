# Install the svgwrite module
import subprocess
subprocess.run(['pip', 'install', 'svgwrite'])

# filename: paper_sword_assembly_instructions.py
import svgwrite

# Define the assembly instructions dimensions
instructions_width = 200  # mm
instructions_height = 150  # mm

# Create an SVG drawing object
dwg = svgwrite.Drawing('paper_sword_assembly_instructions.svg', profile='tiny')

# Add text and shapes to the instructions
dwg.add(dwg.text('Step 1: Assemble the sword\'s blade', insert=(10, 20), font_size=12, font_family='Arial'))
dwg.add(dwg.rect(insert=(20, 30), size=(50, 20), fill='none', stroke='black', stroke_width=0.5))
dwg.add(dwg.text('Step 2: Attach the hilt to the blade', insert=(10, 60), font_size=12, font_family='Arial'))
dwg.add(dwg.rect(insert=(20, 70), size=(50, 20), fill='none', stroke='black', stroke_width=0.5))

# Save the SVG file
dwg.save()
