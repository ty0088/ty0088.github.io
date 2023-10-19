# Simulate a sports tournament

import csv
import sys
import random

# Number of simluations to run
N = 1000


def main():
    # Ensure correct usage
    if len(sys.argv) != 2:
        sys.exit("Usage: python tournament.py FILENAME")

    teams = []
    # TODO: Read teams into memory from file
    # open csv file from argv[1] for reading
    # read in each team and add to teams as dictionary {"team":"team", "rating":"rating"}
    with open(sys.argv[1], "r") as file:
        reader = csv.DictReader(file)
        for row in reader:
            teams.append({"team": row["team"], "rating": int(row["rating"])})
        file.close()

    counts = {}
    # TODO: Simulate N tournaments and keep track of win counts
    for i in range(N):
        winner = simulate_tournament(teams)
        if winner in counts:
            # add 1 to count of existing team
            counts[winner] += 1
        else:
            # add new team with win of 1
            counts[winner] = 1

    # Print each team's chances of winning, according to simulation
    for team in sorted(counts, key=lambda team: counts[team], reverse=True):
        print(f"{team}: {counts[team] * 100 / N:.1f}% chance of winning")


def simulate_game(team1, team2):
    """Simulate a game. Return True if team1 wins, False otherwise."""
    rating1 = team1["rating"]
    rating2 = team2["rating"]
    probability = 1 / (1 + 10 ** ((rating2 - rating1) / 600))
    return random.random() < probability


def simulate_round(teams):
    """Simulate a round. Return a list of winning teams."""
    winners = []

    # Simulate games for all pairs of teams
    for i in range(0, len(teams), 2):
        if simulate_game(teams[i], teams[i + 1]):
            winners.append(teams[i])
        else:
            winners.append(teams[i + 1])

    return winners


def simulate_tournament(teams):
    """Simulate a tournament. Return name of winning team."""
    # TODO
    # keep simulating rounds and passing in teams until only 1 team left in teams list
    winner = simulate_round(teams)
    if len(winner) == 1:
        # if 1 team left, return team name
        return winner[0]["team"]
    else:
        # recursively call simulate_tournament if more than 1 team returned
        return simulate_tournament(winner)


if __name__ == "__main__":
    main()
