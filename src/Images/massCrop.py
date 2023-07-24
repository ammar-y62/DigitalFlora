from PIL import Image

stageList = [
    (0, 0, 160, 160),
    (160, 0, 320, 160),
    (0, 160, 160, 320),
    (160, 160, 320, 320),
    (0, 320, 160, 480),
    (160, 320, 320, 480),
    (0, 480, 160, 640),
    (160, 480, 320, 640)
]
plantList = ["Blue Iris", "Shishito Pepper", "Pink Foxglove", "Himalayan Blue Poppy", "Pink Lotus",
             "Yellow Moss Sorrel", "Wild Arum", "Tiger Lily"]

for plant in plantList:
    plantImage = Image.open("./" + plant + "/" + plant + ".png")
    for stage in range(0, 8):
        subImage = plantImage.crop(stageList[stage])
        subImage.save('./'+plant+'/'+str(stage)+'.png')

