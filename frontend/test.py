from WeTransferTool import We

wet = We()
metadata = wet.upload("C:/Users/Skatami/Desktop/42Heilbron/Projects/KI-Festival2/src/components/hero_intro/thor.mp4", 'thor.mp4', 'message')
print(metadata['shortened_url'])