iPad / desktop controller background video
------------------------------------------

Put **one** of these files next to this README:

  ipad-background.mp4   (recommended — use your Desktop export)
  ipad-background.mov   (optional fallback)

Copy from Desktop (your current file):

  cp "/Users/maoyuman/Desktop/iPad background video.MP4" assets/ipad-background.mp4

Older QuickTime copy (if you still use it):

  cp "/Users/maoyuman/Desktop/iPad background video.MOV" assets/ipad-background.mov

If Chrome still won’t play a MOV, convert to H.264 MP4:

  ffmpeg -i "/Users/maoyuman/Desktop/iPad background video.MOV" -an -c:v libx264 -pix_fmt yuv420p assets/ipad-background.mp4

Always open through the local server (not file://):

  python3 bridge_server.py --port 8899
  → http://127.0.0.1:8899/controller.html

Large videos under assets/ and Desktop-named copies are listed in .gitignore so they are not pushed to GitHub.
