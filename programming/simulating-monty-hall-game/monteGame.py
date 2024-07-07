#!/usr/bin/env python

import numpy as np
import matplotlib.pyplot as plt

ngames = 100000

chance_of_success_by_switching = np.zeros(ngames,dtype=np.double)
chance_of_success_by_not_switching = np.zeros(ngames,dtype=np.double)

options = [1,2,3]

for i in range(ngames):
    door_host_will_open = options.copy()
    door_with_car = np.random.randint(1,4)
    door_host_will_open.remove(door_with_car)
    door_i_choose = np.random.randint(1,4)
    if (door_i_choose!=door_with_car): door_host_will_open.remove(door_i_choose)
    
    door_to_switch = options.copy()
    door_to_switch.remove(door_i_choose)
    door_to_switch.remove(door_host_will_open[0])
    
    if i==0:
        if (door_to_switch[0]==door_with_car):
            chance_of_success_by_switching[i] = 1.0
        else:
            chance_of_success_by_not_switching[i] = 1.0
    else:
        if (door_to_switch[0]==door_with_car):
            chance_of_success_by_switching[i] = (chance_of_success_by_switching[i-1]*np.double(i) + 1.0)/np.double(i+1)
            chance_of_success_by_not_switching[i] = chance_of_success_by_not_switching[i-1]*np.double(i)/np.double(i+1)
        else:
            chance_of_success_by_not_switching[i] = (chance_of_success_by_not_switching[i-1]*np.double(i) + 1.0)/np.double(i+1)
            chance_of_success_by_switching[i] = chance_of_success_by_switching[i-1]*np.double(i)/np.double(i+1)

trials = np.linspace(1,ngames,ngames)
plt.semilogx(trials, chance_of_success_by_switching, 'r-')
plt.hold('on')
plt.semilogx(trials, chance_of_success_by_not_switching, 'b-')
plt.legend(['switch choice' , 'not switch choice'])
plt.xlabel('Game Number')
plt.ylabel('Average probability of winnig')
plt.title('{} Monte Hall Games: On average, you win if your switch!'.format(ngames))
plt.savefig('MontyGameResult.png')
plt.show()