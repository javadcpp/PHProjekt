<?php
/**
 * Connection to the global configuration table that
 * stores administration settings.
 *
 * LICENSE: Licensed under the terms of the PHProjekt 6 License
 *
 * @copyright  2007, 2008 Mayflower GmbH (http://www.mayflower.de)
 * @license    http://phprojekt.com/license PHProjekt 6 License
 * @version    CVS: $Id$
 * @author     David Soria Parra <soria_parra@mayflower.de>
 * @package    PHProjekt
 * @link       http://www.phprojekt.com
 * @since      File available since Release 1.0
 */
/**
 * Connection to the global configuration table that
 * stores administration settings
 *
 * @copyright  2007, 2008 Mayflower GmbH (http://www.mayflower.de)
 * @version    Release: @package_version@
 * @license    http://phprojekt.com/license PHProjekt 6 License
 * @package    PHProjekt
 * @link       http://www.phprojekt.com
 * @since      File available since Release 1.0
 * @author     David Soria Parra <soria_parra@mayflower.de>
 */
class Default_Models_Configuration extends Phprojekt_ActiveRecord_Abstract
{
    /**
     * The self defined information manager that holds
     * information about the configured admin module
     * 
     * @var Phprojekt_ModelInformation_Interface
     */
    protected $_informationManager;

    /**
     * Initialize a new class
     * 
     * @param $configuration array The admin module configuration to be used
     */
    public function __construct ($configuration = null)
    {
        parent::__construct();
        $this->_informationManager = new Phprojekt_ModelInformation_Default($configuration);
    }

    /**
     * Returns the information manager
     * 
     * @see Phprojekt_Model_Interface::getInformation()
     * 
     * @return Phprojekt_ModelInformation_Interface
     */
    public function getInformation ()
    {
        return $this->_informationManager;
    }
}
