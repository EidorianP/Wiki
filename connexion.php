<!DOCTYPE html>

<html lang="en">
    <head>

        <title>Connexion</title>

        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/fontawesome-all.min.css" rel="stylesheet">
        <link href="css/swiper.css" rel="stylesheet">
        <link href="css/styles.css" rel="stylesheet">
        

        <link rel="icon" href="images/favicon.png">
    </head>
    <body>

        <nav id="navbarExample" class="navbar navbar-expand-lg fixed-top navbar-dark" aria-label="Main navigation">
            <div class="container">

            <a class="navbar-brand logo-text" href="index.html">RandoWiki</a>   

                <button class="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
                    <ul class="navbar-nav ms-auto navbar-nav-scroll">
                        <li class="nav-item">
                            <a class="nav-link" href="index.html">Accueil</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="gamepage.html">Jeu</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="premium.html">Premium</a>
                        </li>
                                              
                        <li class="nav-item">
                            <a class="nav-link" href="contact.html">Se connecter</a>
                        </li>
                    </ul>
                    <span class="nav-item social-icons">
                        <span class="fa-stack">
                            <a href="#your-link">
                                <i class="fas fa-circle fa-stack-2x"></i>
                                <i class="fab fa-facebook-f fa-stack-1x"></i>
                            </a>
                        </span>
                        <span class="fa-stack">
                            <a href="#your-link">
                                <i class="fas fa-circle fa-stack-2x"></i>
                                <i class="fab fa-twitter fa-stack-1x"></i>
                            </a>
                        </span>
                    </span>
                </div>
            </div>
        </nav>

        <section class="vh-100 gradient-custom">
            <div class="container py-5 h-100">
              <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                  <div class="card bg-dark text-white" style="border-radius: 1rem;">
                    <div class="card-body p-5 text-center">
          
                      <form class="mb-md-5 mt-md-4 pb-5" method="POST" action="login.php">
          
                        <h2 class="fw-bold mb-2 text-uppercase">Connexion</h2>

                        <p class="text-white-50 mb-5">Veuilez entrer votre identifiant et votre mot de passe ! </p>
          
                        <div class="form-outline form-white mb-4">
                          <input type="email" id="email" name="email" class="form-control form-control-lg" />
                          <label class="form-label" for="email">Email</label>
                        </div>
          
                        <div class="form-outline form-white mb-4">
                          <input type="password" id="password" name="password" class="form-control form-control-lg" />
                          <label class="form-label" for="password">Mot de passe</label>
                        </div>
          
                        <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Mot de passe oublié?</a></p>
          
                        <button class="btn btn-outline-light btn-lg px-5" type="submit" name="submit">Connexion</button>
          
                        <div class="d-flex justify-content-center text-center mt-4 pt-1">
                          <a href="#!" class="text-white"><i class="fab fa-facebook-f fa-lg"></i></a>
                          <a href="#!" class="text-white"><i class="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                          <a href="#!" class="text-white"><i class="fab fa-google fa-lg"></i></a>
                        </div>
          
                      </form>
          
                      <div>
                        <p class="mb-0">Vous n'avez pas de compte? <a href="inscription.php" class="text-white-50 fw-bold">Création</a>
                        </p>
                      </div>
          
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div class="footer bg-dark-blue">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="footer-col first">
                            <h6>A propos</h6>
                            <p class="p-small">RandoWiki est un site gratuit, développé par Adrien Vilette et Jordan Renard, avec l'aide de ChatGPT ainsi que des données de Jean Michel Fauconnier.</p>
                        </div>
                        <div class="footer-col second">
                        </div>
                        <div class="footer-col third">
                            <span class="fa-stack">
                                <a href="#your-link">
                                    <i class="fas fa-circle fa-stack-2x"></i>
                                    <i class="fab fa-facebook-f fa-stack-1x"></i>
                                </a>
                            </span>
                            <span class="fa-stack">
                                <a href="#your-link">
                                    <i class="fas fa-circle fa-stack-2x"></i>
                                    <i class="fab fa-twitter fa-stack-1x"></i>
                                </a>
                            </span>
                            <span class="fa-stack">
                                <a href="#your-link">
                                    <i class="fas fa-circle fa-stack-2x"></i>
                                    <i class="fab fa-pinterest-p fa-stack-1x"></i>
                                </a>
                            </span>
                            <span class="fa-stack">
                                <a href="#your-link">
                                    <i class="fas fa-circle fa-stack-2x"></i>
                                    <i class="fab fa-instagram fa-stack-1x"></i>
                                </a>
                            </span>
                            <p class="p-small">Pour toute demande, merci de nous contacter ! <a href="mailto:contact@site.com"><strong>contact@RandoWiki.com</strong></a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <div class="copyright bg-dark-blue">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <p class="p-small">Copyright © <a href="#your-link">Adrien Vilette</a></p>
                    </div>
                </div>
            </div>
        </div>

        <button onclick="topFunction()" id="myBtn">
            <img src="images/up-arrow.png" alt="alternative">
        </button>

        <script src="js/bootstrap.min.js"></script>
        <script src="js/swiper.min.js"></script>
        <script src="js/purecounter.min.js"></script>
        <script src="js/replaceme.min.js"></script>
        <script src="js/scripts.js"></script> 
        <script src="requetewiki.js"></script>
    </body>
</html>          
