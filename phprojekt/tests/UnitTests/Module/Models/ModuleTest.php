<?php
/**
 * Unit test
 *
 * LICENSE: Licensed under the terms of the PHProjekt 6 License
 *
 * @copyright  Copyright (c) 2007 Mayflower GmbH (http://www.mayflower.de)
 * @license    http://phprojekt.com/license PHProjekt 6 License
 * @version    CVS: $Id:
 * @link       http://www.phprojekt.com
 * @since      File available since Release 1.0
*/
require_once 'PHPUnit/Framework.php';

/**
 * Tests Module Model class
 *
 * @copyright  Copyright (c) 2007 Mayflower GmbH (http://www.mayflower.de)
 * @license    http://phprojekt.com/license PHProjekt 6 License
 * @version    Release: @package_version@
 * @link       http://www.phprojekt.com
 * @since      File available since Release 1.0
 * @author     Eduardo Polidor <polidor@mayflower.de>
 */
class Phprojekt_ModuleModelModule_Test extends PHPUnit_Framework_TestCase
{
    /**
     * Test valid method
     *
     */
    public function testModuleModelsModule()
    {
        $moduleModel = new Phprojekt_Module_Module();
        $expected    = new Phprojekt_Module_Information();
        $this->assertEquals($moduleModel->getInformation(), $expected);
        $this->assertEquals($moduleModel->getRights(), array());
        $this->assertEquals($moduleModel->saveModule(array('name' => 'test', 'internalName' => 'test', 'saveType' => 0, 'active' => 1)), 7);
        $moduleModel->find(7);
        $this->assertEquals($moduleModel->recordValidate(), true);
        $this->assertEquals($moduleModel->delete(), null);
        $this->assertEquals($moduleModel->getError(), array());
        $this->assertEquals($moduleModel->delete(), null);
    }
}