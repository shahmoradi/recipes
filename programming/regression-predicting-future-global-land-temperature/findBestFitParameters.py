import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
sns.set()

# download the file from web

def download(url,filePath):
    import urllib.request
    import shutil
    with urllib.request.urlopen(url) as response, open(filePath, 'wb') as out_file:
        shutil.copyfileobj(response, out_file)
    return None

filePath = "./usaTemperatureHistory.txt"
download( url = "https://www.cdslab.org/recipes/programming/regression-predicting-future-global-land-temperature/usaTemperatureHistory.txt"
        , filePath = filePath
        )

# parse the file contents

with open(filePath,"r") as file:
    fileLines = file.readlines()
    dates = []
    anomalies = []
    for line in fileLines[70:]:
        year = np.double(line[0:6])
        month = np.double(line[7:12])
        tempDiff = np.double(line[13:22])
        dates.append( year + month/13 )
        anomalies.append(tempDiff)

# generate the plot

fig = plt.figure()
ax = fig.gca()
plt.plot(dates,anomalies)
ax.set_xlabel("Year")
ax.set_ylabel("Temperature (Celsius)")
plt.title("Global Land Temperature Anomaly vs. 1951-1980 Average")
plt.savefig("GlobalLandTemperatureAnomalyPython.png")
plt.show()

# do linear fitting

class Anomaly():
    coef = None
    def predict(self,dates):
        return self.coef[0]*dates + self.coef[1]

anomaly = Anomaly()

startRow = 2700; # corresponding to year 1970
anomaly.coef = np.polyfit ( x = dates[startRow:]
                          , y = anomalies[startRow:]
                          , deg = 1
                          )

dates_range = np.linspace(1750,2051,1000)

# make figure

fig = plt.figure()
ax = fig.gca()
plt.plot(dates,anomalies)
plt.plot(dates_range,anomaly.predict(dates_range),"r")
ax.set_xlabel("Year")
ax.set_ylabel("Temperature (Celsius)")
plt.title("Global Land Temperature Anomaly vs. 1951-1980 Average")
plt.savefig("GlobalLandTemperatureAnomaly2050Python.png")
plt.show()

