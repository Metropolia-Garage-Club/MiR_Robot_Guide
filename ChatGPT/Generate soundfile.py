import gtts as gTTS

speech = gTTS("Pieni hetki prosessoin pyyntöä", lang="fi")
speech_file = 'processing.mp3'
speech.save(speech_file)
