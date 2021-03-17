import sys 
import pandas as pd
# Takes first name and last name via command 
# line arguments and then display them 
# print("Output from Python") 
print("First name: " + sys.argv[1]) 
# print("Last name: " + sys.argv[2]) 

# save the script as hello.py 

# Import Pandas
# import pandas as pd
# import numpy as np
# # Load Movies Metadata
# metadata = pd.read_csv('RecData.csv', low_memory=False)
# Load keywords and credits
# credits = pd.read_csv('credits.csv')
# keywords = pd.read_csv('keywords.csv')

# # Remove rows with bad IDs.
# metadata = metadata.drop([19730, 29503, 35587])
print("start")
# print('recom')
# print('recom')
# print('recom')
# print('recom')
# Convert IDs to int. Required for merging
# keywords['id'] = keywords['id'].astype('int')
# credits['id'] = credits['id'].astype('int')
# metadata['id'] = metadata['id'].astype('int')

# Merge keywords and credits into your main metadata dataframe
# metadata = metadata.merge(credits, on='id')
# metadata = metadata.merge(keywords, on='id')
# metadata.head(2)

# from ast import literal_eval

# features = ['cast', 'crew', 'keywords', 'genres']
# for feature in features:
#     metadata[feature] = metadata[feature].apply(literal_eval)

# def get_director(x):
#     print("director")
#     for i in x:
#         if i['job'] == 'Director':
#             return i['name']
#     return np.nan

# def get_list(x):
#     print('list')
#     if isinstance(x, list):
#         names = [i['name'] for i in x]
#         #Check if more than 3 elements exist. If yes, return only first three. If no, return entire list.
#         if len(names) > 3:
#             names = names[:3]
#         return names

#     #Return empty list in case of missing/malformed data
#     return []

# metadata['director'] = metadata['crew'].apply(get_director)

# features = ['cast', 'keywords', 'genres']
# for feature in features:
#     metadata[feature] = metadata[feature].apply(get_list)

# # Print the new features of the first 3 films
# metadata[['title', 'cast', 'director', 'keywords', 'genres']].head(3)

# def clean_data(x):
#     print('clearData')
#     if isinstance(x, list):
#         return [str.lower(i.replace(" ", "")) for i in x]
#     else:
#         #Check if director exists. If not, return empty string
#         if isinstance(x, str):
#             return str.lower(x.replace(" ", ""))
#         else:
#             return ''


# features = ['cast', 'keywords', 'director', 'genres']

# for feature in features:
#     metadata[feature] = metadata[feature].apply(clean_data)

# def create_soup(x):
#     return ' '.join(x['keywords']) + ' ' + ' '.join(x['cast']) + ' ' + x['director'] + ' ' + ' '.join(x['genres'])
# import pandas as pd
# import numpy as np
# metadata['soup'] = metadata.apply(create_soup, axis=1)
# metadata[['soup']].head(2)
# def datas():
    # print('recomDa')
    # import pandas as pd
    # import numpy as np
    # Load Movies Metadata
# metadata = pd.read_csv('RecData.csv', low_memory=False)
    # Import CountVectorizer and create the count matrix
# from sklearn.feature_extraction.text import CountVectorizer

# count = CountVectorizer(stop_words='english')
# count_matrix = count.fit_transform(metadata['soup'])

#     # Compute the Cosine Similarity matrix based on the count_matrix
# from sklearn.metrics.pairwise import cosine_similarity

# cosine_sim2 = cosine_similarity(count_matrix, count_matrix)

    # Reset index of your main DataFrame and construct reverse mapping as before
    # metadata = metadata.reset_index()
    # indices = pd.Series(metadata.index, index=metadata['title'])

    # def get_recommendations(title, cosine_sim=cosine_sim):
        # Get the index of the movie that matches the title
# metadata = metadata.reset_index()
# indices = pd.Series(metadata.index, index=metadata['title'])
# idx = indices[title]
# print('recom')

#         # Get the pairwsie similarity scores of all movies with that movie
# sim_scores = list(enumerate(cosine_sim[idx]))

#         # Sort the movies based on the similarity scores
# sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

#         # Get the scores of the 10 most similar movies
# sim_scores = sim_scores[1:11]

#         # Get the movie indices
# movie_indices = [i[0] for i in sim_scores]

#         # Return the top 10 most similar movies
# print( metadata['title'].iloc[movie_indices])

# datas()
# get_recommendations('The Dark Knight Rises', cosine_sim2)


def main():
    metadata = pd.read_csv('RecData.xlsx', low_memory=False)
    print('recom0')
    from sklearn.feature_extraction.text import CountVectorizer
    print('recom1')
    count = CountVectorizer(stop_words='english')
    count_matrix = count.fit_transform(metadata['soup'])
    print('recom2')
    # Compute the Cosine Similarity matrix based on the count_matrix
    from sklearn.metrics.pairwise import cosine_similarity
    print('recom3')
    cosine_sim2 = cosine_similarity(count_matrix, count_matrix)
    print('recom4')
    # Reset index of your main DataFrame and construct reverse mapping as before
    metadata = metadata.reset_index()
    indices = pd.Series(metadata.index, index=metadata['title'])
    print('recom5')

    idx = indices['The Dark Knight Rises']
    print('recom6')

        # Get the pairwsie similarity scores of all movies with that movie
    sim_scores = list(enumerate(cosine_sim2[idx]))
    print('recom7')
        # Sort the movies based on the similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    print('recom8')
        # Get the scores of the 10 most similar movies
    sim_scores = sim_scores[1:11]

        # Get the movie indices
    movie_indices = [i[0] for i in sim_scores]
    print('reco9')
    # Return the top 10 most similar movies
    print( metadata['title'].iloc[movie_indices])

if __name__ == '__main__':
    main()
