
#handle args
import argparse
import os


if __name__ == '__main__':
    # get env variables
    supabase_url = os.getenv('SUPABASE_URL')
    supabase_anon_key = os.getenv('SUPABASE_ANON_KEY')
    supabase_secret_key = os.getenv('SUPABASE_SECRET_KEY')
    #parse args
    parser = argparse.ArgumentParser()
    parser.add_argument('--supabase-url', help='Supabase project URL, defaults to env variable', default=supabase_url )
    parser.add_argument('--supabase-anon-key', help='Supabase anon key, defaults to env variable', default=supabase_anon_key )
    parser.add_argument('--supabase-secret-key', help='Supabase secret key, defaults to env variable', default=supabase_secret_key )
    args = parser.parse_args()

    # check if variables are set
    if not supabase_url:
        raise TypeError( 'No supabase url set')
    if not supabase_anon_key:
        raise TypeError('No supabase anon key set')
    if not supabase_secret_key:
        raise TypeError('No supabase secret key set')
    
        


