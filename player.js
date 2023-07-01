class Player
{
    constructor(musics)
    {
        this.musics = musics;
        this.index = 0; 
    }

    getMusic()
    {
        return this.musics[this.index];
    }

    nextMusic()
    {
        if(this.index < this.musics.length-1)
        {
            this.index++;
        }
        else
        {
            this.index = 0;
        }
    }

    previousMusic()
    {
        if(this.index != 0)
        {
            this.index--;
        }
        else
        {
            this.index = this.musics.length-1
        }
    }
}