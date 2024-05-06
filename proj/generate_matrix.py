from random import randint
from pulp import LpMaximize, LpProblem, LpVariable

def rand(word, max):
    if word == 'mucho':
        return randint(1 + max * 2 / 3, max)
    elif word == 'normal':
        return randint(1 + max * 1 / 3, max * 2 / 3)
    else:
        return randint(1, max * 1 / 3)

def generate_matrix(energy, pleasure):
    C = []
    Pa = []
    C_init = []
    Pa_finish = []
    for i in range(len(energy)):
        C.append([])
        for j in range(len(energy[i])):
            if j == 0:
                C_init.append(int(energy[i][j]))
            else:
                C[i].append(int(energy[i][j]))

    for i in range(len(pleasure)):
        Pa.append([])
        for j in range(len(pleasure[i])):
            if j == (len(pleasure[i])-1):
                Pa_finish.append(int(pleasure[i][j]))
            else:
                Pa[i].append(int(pleasure[i][j]))

    return C, Pa, C_init, Pa_finish

def simplex_form(prob, x, indexes, C, Pa, C_init, Pa_finish):
    for i in indexes:
        prob += sum(x[j]*C[i][j] for j in range(len(x))) <= C_init[i]
        new_Pa = [-j for j in Pa[i]]
        prob += sum(x[j]*new_Pa[j] for j in range(len(x))) <= -Pa_finish[i]

def create_prob_1(C, Pa, C_init, Pa_finish, mini):
    prob = LpProblem("Problem", LpMaximize)
    x = [LpVariable(f'x{i}', lowBound=mini, cat="Integer") for i in range(len(C[0]))]
    prob += sum(t for t in x)
        
    simplex_form(prob, x, [i for i in range(len(C))], C, Pa, C_init, Pa_finish)
    return prob

def create_prob_2(C, Pa, C_init, Pa_finish, mini):
    prob = LpProblem("Problem", LpMaximize)
    x = [LpVariable(f'x{i}', lowBound=mini, cat="Integer") for i in range(len(C[0]))]
    min_value = LpVariable('min_value', lowBound=mini, cat="Integer")
    prob += min_value
        
    simplex_form(prob, x, [i for i in range(len(C))], C, Pa, C_init, Pa_finish)
    for i in range(len(Pa)):
        prob += min_value <= sum(x[j]*Pa[i][j] for j in range(len(x)))
    return prob

def create_prob_3(C, Pa, C_init, Pa_finish, mini):
    prob = LpProblem("Problem", LpMaximize)
    x = [LpVariable(f'x{i}', lowBound=mini, cat="Integer") for i in range(len(C[0]))]
    min_value = LpVariable('min_value', lowBound=mini, cat="Integer")
    prob += min_value
        
    simplex_form(prob, x, [i for i in range(len(C))], C, Pa, C_init, Pa_finish)
    for i in range(len(C)):
        prob += min_value <= C_init[i] - sum(x[j]*C[i][j] for j in range(len(x)))
    return prob

def save_data(prob):
    result = []
    var = prob.variables()
    for i in range(len(var)):
        if var[i].name == 'min_value': continue
        result.append(int(var[i].varValue))
    return result

def switch_modes(C, Pa, C_init, Pa_finish, mode, mini):
    if mode == 1:
        return create_prob_1(C, Pa, C_init, Pa_finish, mini)
    elif mode == 2:
        return create_prob_2(C, Pa, C_init, Pa_finish, mini)
    else:
        return create_prob_3(C, Pa, C_init, Pa_finish, mini)

def resolve(energy, pleasure, mode):
    C, Pa, C_init, Pa_finish = generate_matrix(energy, pleasure)

    prob = switch_modes(C, Pa, C_init, Pa_finish, mode, 1)
    prob.solve()

    if prob.status == 1:
        return save_data(prob)
    else:
        prob = switch_modes(C, Pa, C_init, Pa_finish, mode, 0)
        prob.solve()
        if prob.status == 1:
            return save_data(prob)

    return None