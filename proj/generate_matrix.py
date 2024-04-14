from random import randint
from pulp import LpMaximize, LpProblem, LpVariable

def rand(word, max):
    if word == 'mucho':
        return randint(1 + max * 2 / 3, max)
    elif word == 'normal':
        return randint(1 + max * 1 / 3, max * 2 / 3)
    else:
        return randint(1, max * 1 / 3)

def generate_matrix(positions, names, energy, pleasure):
    C = []
    Pa = []
    C_init = []
    Pa_finish = []
    for n in names:
        i = len(C)
        C.append([])
        Pa.append([])

        e = energy[n]
        if isinstance(e, int):
            C_init.append(e)
        else:
            C_init.append(rand(e, 12 * len(positions)))

        p = pleasure[n]
        if isinstance(p, int):
            Pa_finish.append(p)
        else:
            Pa_finish.append(rand(p, 12 * len(positions)))  

        for pos in positions:
            e = energy[f'{n}_{pos}']
            if isinstance(e, int):
                C[i].append(e)
            else:
                C[i].append(rand(e, 15))

            p = pleasure[f'{n}_{pos}']
            if isinstance(p, int):
                Pa[i].append(p)
            else:
                Pa[i].append(rand(p, 15))  
    
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

def resolve(positions, names, energy, pleasure, mode):
    C, Pa, C_init, Pa_finish = generate_matrix(positions, names, energy, pleasure)

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