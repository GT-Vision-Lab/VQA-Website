# coding=utf-8
speakers = [
    ("Aida Nematzadeh", "Towards Better Multimodal Pretraining"),
    ("Anirudh Koul", "How AI Can Empower The Blind Community"),
    ("Damien Teney", "Visual question answering and the limits of statistical learning. Are we building a ladder to the moon?"),
    ("Justin Johnson", "Learning Visual Representations from Language"),
    ("Olga Russakovsky", "Models, metrics, tasks and fairness in vision and language"),
    ("Raquel Fernández", "Visual & Conversational Saliency"),
    ("Vittorio Ferrari", "Connecting Vision and Language with Localized Narratives and Open Images"),
    ("Mohit Bansal", "Knowledgeable & Spatial-Temporal Vision+Language"),
]

str_format = 'Invited Talk by %s on "%s" at the Visual Question Answering Workshop, CVPR 2021.'

for speaker, title in speakers:
    print(str_format % (speaker, title))

str_format = '%s - Invited Talk at the VQA Workshop 2021'

for speaker, title in speakers:
    print(str_format % (speaker))